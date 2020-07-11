<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Create Task</h1>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input id="title" v-model="title" type="text" class="validate" required>
          <label for="title">Title</label>
          <span class="helper-text" data-error="please provide the correct title"></span>
        </div>

        <div class="chips" ref="chips"></div>

        <div class="input-field">
          <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{ description.length }}/2048</span>
        </div>

        <div class="input-field">
          <input type="text" class="datepicker" ref="datepicker">
        </div>

        <button class="waves-effect waves-light btn-large blue darken-4">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import STATUS from '@/libs/status';

export default {
  name: 'Create',
  data: () => ({
     title: '',
     description: '',
     chips: null,
     date: null,
  }),
  mounted() {
      this.chips = M.Chips.init(this.$refs.chips, {
          placeholder: 'Task tags'
      });

      this.date = M.Datepicker.init(this.$refs.datepicker, {
          format: 'dd.mm.yyyy',
          defaultDate: new Date(),
          setDefaultDate: true
      });
  },
  methods: {
      submitHandler() {
          const task = {
              id: Date.now(), //unique id (but also can enable uuid)

              title: this.title,
              description: this.description,

              status: STATUS.ACTIVE,

              tags: this.chips.chipsData,

              date: this.date.date
          };

          this.$store.dispatch('createTask', task);
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
