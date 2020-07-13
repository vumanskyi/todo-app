<template>
    <div class="row">
        <div v-if="task" class="col s6 offset-s3">
            <h1>Task - {{task.title}}</h1>

            <form @submit.prevent="submitHandler">
                <div class="chips" ref="chips"></div>

                <div class="input-field">
                    <textarea style="min-height: 100px" v-model="description" id="description" class="materialize-textarea"></textarea>
                    <label for="description">Description</label>
                    <span class="character-counter" style="float: right; font-size: 12px;">{{ description.length }}/2048</span>
                </div>

                <div class="input-field">
                    <input type="text" class="datepicker" ref="datepicker">
                </div>

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
            // }
        },
        data: () => ({
            description: '',
            chips: null,
            date: null,
            task: '',
        }),
        mounted() {
            this.$store.dispatch('task', this.$route.params.id);

            this.task = this.$store.getters.task;
            this.description = this.task.description || '';

            console.log(this.task);

            setTimeout(() => {
                M.updateTextFields();
            }, 0);

            this.chips = M.Chips.init(this.$refs.chips, {
                placeholder: 'Task tags',
                data: this.task.tags
            });

            this.date = M.Datepicker.init(this.$refs.datepicker, {
                format: 'dd.mm.yyyy',
                defaultDate: new Date(this.task.date),
                setDefaultDate: true
            });
        },
        methods: {
            submitHandler() {
                this.$store.dispatch('updateTask', {
                    id: this.task.id,
                    description: this.description,
                    tags: this.chips.chipsData,
                    date: this.date.date
                });
                this.$router.push('/list');
            },
            completeTask() {
                this.$store.dispatch('completeTask', this.task.id);
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