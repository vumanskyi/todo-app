<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Create Task</h1>

      <form>

        <div class="input-field">
          <input id="title" v-model="title" type="text" class="validate" required>
          <label for="title">Title</label>
          <span class="helper-text" data-error="please provide the correct title"></span>
        </div>


        <div class="input-field">
          <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{ description.length }}/2048</span>
        </div>

        <md-chips v-model="tags" md-placeholder="Add tags..."></md-chips>


        <md-datepicker v-model="date" />

        <button type="submit" @click="submitHandler" class="waves-effect waves-light btn-large blue darken-4">Create</button>
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
     date: null,
     tags: []
  }),
  methods: {
      submitHandler(event) {
          event.preventDefault();

          const task = {
              id: Date.now(), //unique id (but also can enable uuid)

              title: this.title,
              description: this.description,

              status: STATUS.ACTIVE,

              tags: this.tags,

              date: this.date
          };

          if (this.description != '' && this.title != '' && this.date != null) {
              this.$store.dispatch('CREATE_TASK', task);
              this.$router.push('/list');
          }
      }
  }
}
</script>
