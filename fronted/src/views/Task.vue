<template>
    <div class="row">
        <div v-if="load" class="col s6 offset-s3">
            <h1>Task - {{task.title}}</h1>
                <form @submit.prevent="submitHandler">

                    <div class="input-field">
                        <textarea style="min-height: 100px" v-model="description" id="description" class="materialize-textarea"></textarea>
                        <label for="description">Description</label>
                        <span class="character-counter" style="float: right; font-size: 12px;">{{ description.length }}/2048</span>
                    </div>

                    <md-chips v-model="tags" md-placeholder="Add tags..."></md-chips>


                    <md-datepicker v-model="date" />

                    <div v-if="task.status !== 'completed' ">
                        <button type="button" @click="completeTask" class="waves-effect waves-light btn-large blue " style="margin-right: 1rem">Complete</button>

                        <button type="submit" class="waves-effect waves-light btn-large blue darken-4">Update</button>
                    </div>
                </form>
        </div>

        <div v-else>
            <h1>Task not found</h1>
        </div>

    </div>

</template>

<script>
    export default {
        name: "Task",
        computed: {
            // task() {
                // symbol "+" help to convert string to number
                // return this.$store.getters.taskById(+this.$route.params.id)
                // return this.$store.getters.task()
            // }
        },
        data: () => ({
            description: '',
            date: null,
            task: null,
            load: false,
            tags: []
        }),

        mounted() {
            this.$store.dispatch('GET_TASK', this.$route.params.id).then(resp => {
                const task = this.$store.getters.TASK;

                this.description = task.description;

                this.tags = JSON.parse(task.tags);
                this.date = new Date(task.date);

                setTimeout(() => {
                    M.updateTextFields();
                }, 0);

                this.task = task;
                if (task.status) {
                    this.load = true;
                }
            });
        },
        methods: {
            submitHandler() {
                const task = {
                    id: this.$route.params.id,
                    description: this.description,
                    status: this.task.status,
                    date: this.date,
                    tags: this.tags
                };

                this.$store.dispatch('UPDATE_TASK', task);

                this.$router.push('/list');
            },
            completeTask() {
                const task = {
                    id: this.$route.params.id,
                    description: this.description,
                    status: this.task.status,
                    date: this.date,
                    tags: this.tags
                };
                this.$store.dispatch('COMPLETE_TASK', task);
                this.$router.push('/list');
            }
        },
        destroyed() {
            if (this.date && this.date.destroy) {
                this.date.destroy();
            }

            if (this.chips && this.chips.destroy) {
                this.chips.destroy();
            }
        }
    }
</script>

<style scoped>

</style>