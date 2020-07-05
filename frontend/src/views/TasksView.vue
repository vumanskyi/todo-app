<template>
    <div class="tasks">
      <Tasks />
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Tasks from '@/components/Tasks';

@Component({
  components: {
    Tasks
  }
})
export default class TasksView extends Vue{};
</script>

<style scoped>

</style>
