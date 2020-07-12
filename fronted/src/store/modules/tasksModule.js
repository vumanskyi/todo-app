import STATUS from '@/libs/status';

const TasksModule = {
    state: {
        tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(t => {
            if (new Date() > new Date(t.date)) {
                t.status = STATUS.OUTDATED;
            }

            return t;
        })
    },
    getters: {
        tasks: s => s.tasks,

        /**
         * The same
         *
         * (s) {
         *     return function (id) {
         *         return s.tasks.find(t => t.id === id)
         *     }
         * }
         */
        taskById: s => id => s.tasks.find(t => t.id === id)
    },
    mutations: {
        setTask(state, task) {
            state.tasks.push(task);

            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        updateTask(state, {id, description, tags, date}) {
            const tasks = state.tasks.concat();

            const idx = tasks.findIndex(t => t.id === id);

            const task = tasks[idx];

            const status = new Date(date) > new Date() ? STATUS.ACTIVE : STATUS.OUTDATED;

            tasks[idx] = {...task, date, tags, description, status}

            state.tasks = tasks;

            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },

        completeTask(state, id) {
            const idx = state.tasks.findIndex(t => t.id === id);

            state.tasks[idx].status = STATUS.COMPLETED;

            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
    },
    actions: {
        createTask({commit}, task) {
            commit('setTask', task);
        },

        updateTask({commit}, task) {
            commit('updateTask', task);
        },
        completeTask({commit}, id) {
            commit('completeTask', id);
        }
    },
};

export default TasksModule;