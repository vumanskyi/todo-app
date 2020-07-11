<template>
    <div class="row">
        <h1>List</h1>

        <div class="col s6 filter">
            <select ref="select" v-model="filter">
                <option value="" disabled selected>Choose your option</option>
                <option value="active">Active</option>
                <option value="outdated">Outdated</option>
                <option value="completed">Completed</option>
            </select>
            <label>Status filter</label>
        </div>

        <div class="col s6">
            <!--If we have a filter value, only them reset them-->
            <button v-if="filter" type="button" class="btn btn-small red" @click="filter = null">Clear filter</button>
        </div>



        <div class="col s12">
            <hr />

            <table v-if="tasks.length">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Open</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(task, idx) of displayTask"
                        :key="task.id"
                    >
                        <td>{{idx + 1}}</td>
                        <td>{{task.title}}</td>
                        <td>{{ new Date(task.date).toLocaleDateString() }}</td>
                        <td>
                            <div class="text">
                                <div class="description">
                                    {{task.description}}
                                </div>
                            </div>
                        </td>
                        <td>{{task.status}}</td>
                        <td><router-link tag="button" class="btn btn-small" :to="`/task/${task.id}`">Open</router-link></td>
                    </tr>
                </tbody>
            </table>
            <div v-else> No tasks </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "List",
        computed: {
            tasks() {
                return this.$store.getters.tasks
            },
            //filter
            displayTask() {
                return this.tasks.filter(t => {
                   if (!this.filter) {
                       return true;
                   }
                   return t.status === this.filter;
                });
            }
        },
        data: () => ({
            filter: null
        }),
        mounted() {
            M.FormSelect.init(this.$refs.select, {});
        }
    }
</script>

<style lang="scss" scoped>
.text {
    max-width: 400px;
    .description {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
.filter {
    margin-bottom: 1rem;
}
</style>