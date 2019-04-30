const WorkDay = (label, tasks = []) => {
  return {
    label,
    tasks,
    addTask: task => WorkDay(label, [...tasks, task]),
    appendSlot: slot => {
      const latestTask = tasks.pop();
      return WorkDay(label, [...tasks, latestTask.addSlot(slot)]);
    },
    isOpened: () => tasks.some(task => task.isStaffed())
  };
};
const Task = (label, slots = []) => {
  return {
    label,
    slots,
    addSlot: slot => Task(label, [...slots, slot]),
    isStaffed: () => slots.length > 0
  };
};

const UnknownRow = () => {
  return {
    evolvePlanning: current => current
  };
};
const NewDayRow = data => {
  return {
    evolvePlanning: current => [...current, WorkDay(data[0])]
  };
};
const TaskNameRow = data => {
  const newTask = Task(data[0]);

  return {
    evolvePlanning: current => {
      if (current.length < 1) return current;
      const latestDay = current.pop();
      return [...current, latestDay.addTask(newTask)];
    }
  };
};
const SlotRow = data => {
  const slot = {
    label: data[0],
    hours: data[1],
    person: data[3] && {
      firstName: data[4],
      lastName: data[3],
      telephone: data[5],
      email: data[6]
    },
    notes: data[7]
  };

  return {
    evolvePlanning: current => {
      if (current.length < 1) return current;
      const latestDay = current.pop();
      return [...current, latestDay.appendSlot(slot)];
    }
  };
};

const makeDomainRow = row => {
  const cells = row.map(cell => cell.toLowerCase().trim());

  if (cells[0].startsWith("semaine")) {
    return NewDayRow(row);
  }
  if (cells.filter(Boolean).length === 1) {
    return TaskNameRow(row);
  }

  const isDate = str => str.split("/").length === 3;
  if (isDate(cells[1])) {
    return SlotRow(row);
  }

  return UnknownRow(row);
};

const toPlanning = rows =>
  rows
    .map(makeDomainRow)
    .reduce((acc, row) => row.evolvePlanning(acc), [])
    .filter(day => day.isOpened());

export default toPlanning;