<script>
  import min from "date-fns/min";
  import max from "date-fns/max";
  import closestIndexTo from "date-fns/closestIndexTo";
  import eachDayOfInterval from "date-fns/eachDayOfInterval";
  import isSameDay from "date-fns/isSameDay";
  import startOfWeek from "date-fns/startOfWeek";
  import endOfWeek from "date-fns/endOfWeek";
  import format from "date-fns/format";
  import startOfMonth from "date-fns/startOfMonth";
  import endOfMonth from "date-fns/endOfMonth";
  import addMonths from "date-fns/addMonths";
  import getDay from "date-fns/getDay";

  import Day from "./Day.svelte";
  import FormattedDate from "./FormattedDate.svelte";

  export let days;

  const dateOptions = { weekStartsOn: 1 };
  const perWeek = (weeks, day) => {
    const key = format(day.date, "yy-ww", dateOptions);
    if (!weeks.has(key)) {
      weeks.set(key, {
        label: format(day.date, "ww", dateOptions),
        days: []
      });
    }

    const week = weeks.get(key);
    weeks.set(key, {
      ...week,
      days: [...week.days, day]
    });

    return weeks;
  };

  let from = startOfMonth(new Date());
  let to = endOfMonth(new Date());
  let currentIndex;

  $: dates = days.map(day => day.getDate());
  $: closestIndex = closestIndexTo(new Date(), dates);
  $: currentDay = days[currentIndex || closestIndex];

  $: daysRange = eachDayOfInterval({
    start: startOfWeek(from, dateOptions),
    end: endOfWeek(to, dateOptions)
  })
    .map(date => ({
      date,
      openingDay: days.find(day => isSameDay(date, day.getDate()))
    }))
    .reduce(perWeek, new Map());

  const handleChangeMonth = offset => () => {
    const newMonth = addMonths(from, offset);
    from = startOfMonth(newMonth);
    to = endOfMonth(newMonth);
  };

  const handleOpenDay = date => () => {
    currentIndex = closestIndexTo(date, dates);
  };
</script>

<style>
  .minimap {
    display: flex;
    flex-direction: column;
  }
  .week {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-content: stretch;
    height: 3rem;
    margin-bottom: 1rem;
  }
  .weekname {
    flex: 1;
    text-align: center;
    align-self: center;
  }
  .day {
    flex: 2;
    position: relative;
    background: rgba(0, 0, 0, 0.1);
    line-height: 10px;
    padding: 2px 5px;
  }
  .opened {
    background: rgba(0, 0, 0, 0.2);
  }
  .today {
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  }
  .day-0 {
    order: 7;
  }
  .day-1 {
    order: 1;
  }
  .day-2 {
    order: 2;
  }
  .day-3 {
    order: 3;
  }
  .day-4 {
    order: 4;
  }
  .day-5 {
    order: 5;
  }
  .day-6 {
    order: 6;
  }

  .day-label {
    visibility: hidden;
    position: absolute;
    display: block;
    bottom: 0;
    text-align: center;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    margin: 0;
  }
  .day:hover .day-label {
    visibility: visible;
  }
  .slot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: red;
    display: inline-block;
    margin-right: 2px;
  }
  .filled {
    background: green;
  }
</style>

<div>
  {#if currentDay}
    <h2>
      Du
      <FormattedDate date={from} />
      au
      <FormattedDate date={to} />
    </h2>

    <p>
      <button on:click={handleChangeMonth(-1)}>« Mois précédent</button>
      <button on:click={handleChangeMonth(1)}>Mois suivant »</button>
    </p>

    <div class="minimap">
      {#each [...daysRange.values()] as week}
        <div class="week">
          <div class="weekname">S{week.label}</div>
          {#each week.days as day}
            <div
              class="day day-{getDay(day.date)}"
              class:opened={day.openingDay}
              class:today={isSameDay(day.date, new Date())}>
              <button on:click={handleOpenDay(day.date)} class="day-label">
                {format(day.date, 'dd/MM')}
              </button>
              {#if day.openingDay}
                {#each day.openingDay.tasks as task}
                  {#each task.slots as slot}
                    <div class="slot" class:filled={slot.person} />
                  {/each}
                {/each}
              {/if}
            </div>
          {/each}
        </div>
      {/each}
    </div>

    <Day day={currentDay} />
  {/if}
</div>
