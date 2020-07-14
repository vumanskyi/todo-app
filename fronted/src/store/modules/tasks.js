import STATUS from '@/libs/status';
import { getRequest, putRequest, postRequest} from '@/libs/request';

const tasks = {
    state: {
        //use data from REST API instead of localStorage
        tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(t => {
            if (new Date() > new Date(t.date)) {
                t.status = STATUS.OUTDATED;
            }

            if (t.tags) {
                t.tags = JSON.parse(t.tags || '[]');
            }

            return t;
        }),

        task: JSON.parse(localStorage.getItem('task') || '{}')

    },
    getters: {
        tasks: s => s.tasks,

        /**
         * The same
         *
         * function (s) {
         *     return function (id) {
         *         return s.tasks.find(t => t.id === id)
         *     }
         * }
         */
        taskById: s => id => s.tasks.find(t => t.id === id),

        task: s => s.task,
    },
    mutations: {
        setTask(state, task) {
            state.task = task;
            localStorage.setItem('task', JSON.stringify(state.task));
        },

        setTasks(state, tasks) {
            state.tasks = tasks || [];
            localStorage.setItem('tasks', JSON.stringify(state.tasks || '[]'));
        },
        addTasks(state, task) {
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
        /**
         * @param {Object} commit
         * @param {Object} task
         */
        createTask({commit}, task) {
            task.tags = JSON.stringify(task.tags);
            commit('addTasks', task);

            // console.log(JSON.stringify(task));
            postRequest('http://localhost:8000/v1/tasks', {
                title: task.title,
                description: task.description,
                tags: task.tags,
                date: task.date,
            });
        },

        /**
         * @param {Object} commit
         * @param {Object} task
         */
        updateTask({commit}, task) {
            commit('updateTask', task);
        },

        /**
         * @param {Object} commit
         * @param {Number} id
         */
        completeTask({commit}, id) {
            commit('completeTask', id);
        },

        /**
         * @param {Object} commit
         */
        listOfTask({commit}) {
            localStorage.removeItem('tasks');
            return getRequest('http://localhost:8000/v1/tasks')
                .then(response => {
                    const { data } = response;
                    commit('setTasks', data);
                })
                .catch(error => {
                    console.error(error);
                    commit('setTasks', localStorage.getItem('tasks'))
                })
        },

        /**
         * @param {Object} commit
         * @param {Number} id
         */
        task({commit}, id) {
            getRequest(`http://localhost:8000/v1/tasks/${id}`)
                .then(response => {
                    localStorage.removeItem('task');
                    commit('setTask', response);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
};

export default tasks;