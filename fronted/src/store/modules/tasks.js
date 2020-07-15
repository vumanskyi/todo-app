import STATUS from '@/libs/status';
import { getRequest, putRequest, postRequest} from '@/libs/request';

const tasks = {
    state: {
        tasks: [],
        // //use data from REST API instead of localStorage
        // tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(t => {
        //     if (new Date() > new Date(t.date)) {
        //         t.status = STATUS.OUTDATED;
        //     }
        //
        //     if (t.tags) {
        //         t.tags = JSON.parse(t.tags || '[]');
        //     }
        //
        //     return t;
        // }),

        // task: JSON.parse(localStorage.getItem('task') || '{}')

        task: {}

    },
    getters: {
        TASKS: s => {
            const tasks = s.tasks.map(t => {
                if (new Date() > new Date(t.date)) {
                    t.status = STATUS.OUTDATED;
                }

                if (t.tags) {
                    t.tags = JSON.parse(t.tags);
                }
                return t;
            });
            console.log(tasks);
            return tasks;
        },

        TASK: s => s.task,

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

        SET_TASKS: (s, tasks) => {
            s.tasks = tasks
        },

        SET_TASK: (s, task) => {
            s.task = task;
        },
        //
        // // ADD_TASKS
        //
        // setTask(state, task) {
        //     state.task = task;
        //     localStorage.setItem('task', JSON.stringify(state.task));
        // },
        //
        // addTasks(state, task) {
        //     state.tasks.push(task);
        //
        //     localStorage.setItem('tasks', JSON.stringify(state.tasks));
        // },
        // updateTask(state, {id, description, tags, date}) {
        //     const tasks = state.tasks.concat();
        //
        //     const idx = tasks.findIndex(t => t.id === id);
        //
        //     const task = tasks[idx];
        //
        //     const status = new Date(date) > new Date() ? STATUS.ACTIVE : STATUS.OUTDATED;
        //
        //     tasks[idx] = {...task, date, tags, description, status}
        //
        //     state.tasks = tasks;
        //
        //     localStorage.setItem('tasks', JSON.stringify(state.tasks));
        //
        //     putRequest(`http://localhost:8000/v1/tasks/${id}`, {
        //         tags,
        //         description,
        //         status,
        //         date
        //     })
        //
        // },

        completeTask(state, id) {
            const idx = state.tasks.findIndex(t => t.id === id);

            state.tasks[idx].status = STATUS.COMPLETED;

            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
    },
    actions: {
        /**
         * @param {Object} context
         */
        GET_TASKS: async ({commit}) => {
            let {data} = await getRequest('http://localhost:8000/v1/tasks');
            commit('SET_TASKS', data);
        },

        /**
         * @param {Object} context
         * @param {Number} id
         */
        GET_TASK: async ({commit}, id) => {
           let response = await getRequest(`http://localhost:8000/v1/tasks/${id}`);
           commit('SET_TASK', response);
        },

        /**
         * @param {Object} context
         * @param {Object} task
         */
        CREATE_TASK: async (context, task) => {
            // console.log(JSON.stringify(task));
            await postRequest('http://localhost:8000/v1/tasks', {
                title: task.title,
                description: task.description,
                tags: task.tags,
                date: task.date,
                status: STATUS.ACTIVE
            });
        },

        /**
         * @param {Object} context
         * @param {Object} task
         */
        UPDATE_TASK: async (context, task) => {

          const id = task.id;
          const tags = JSON.stringify(task.tags);
          const description = task.description;
          const date = task.date;
          const status = task.status;

          await putRequest(`http://localhost:8000/v1/tasks/${id}`, {
              tags,
              description,
              status,
              date
          });
        },

        /**
         * @param {Object} context
         * @param {Object} task
         */
        COMPLETE_TASK: async (context, task) => {
            const id = task.id;
            const tags = JSON.stringify(task.tags);
            const description = task.description;
            const date = task.date;
            const status = STATUS.COMPLETED;

            await putRequest(`http://localhost:8000/v1/tasks/${id}`, {
                tags,
                description,
                status,
                date
            });
        },
    },
};

export default tasks;