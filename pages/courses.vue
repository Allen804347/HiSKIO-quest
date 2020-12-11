<template>
  <div class="main">
    <div v-for="course in courses" :key="course.id" class="course-card">
      <div class="course-card__cover-image" :style="`background-image: url('${course.image}');`"></div>
      <div class="course-card__info">
        <div class="course-card__title">
          {{ course.title }}
        </div>
        <br>
        <div class="course-card__author">
          {{ course.lecturers.username }}
        </div>
        <div class="course-card__detail">
          <div>
            評價: {{ course.feedback_score }}%
          </div>
          <div>
            人數: {{ course.students }}人
          </div>
        </div>
      </div>
    </div>
    <div id="detector" />
  </div>
</template>
<script>
import { index } from '@/services/course'

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

export default {
  created() {
    this.getPage()
  },
  mounted() {
    this.detector = document.getElementById('detector')
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  data () {
    return {
      curretnPage: 1,
      totalPages: 1,
      courses: [],
      isLoading: false
    }
  },
  methods: {
    handleScroll (event) {
      if (isInViewport(detector)) {
        this.getNextPage()
      }
    },
    getNextPage() {
      if(!this.isLoading && this.curretnPage < this.totalPages) {
        this.curretnPage += 1;
        this.getPage()
      }
    },
    async getPage() {
      this.isLoading = true
      let res
      try {
        res = await index(this.$axios, this.curretnPage)
        this.isLoading = false
        if (res.status !== 200) {
          alert('get data fail')
          return
        }
        // login success
      } catch (err) {
        this.isLoading = false
        alert('http request error')
        return
      }
      if (res.data) {
        this.totalPages = res.data.meta.total / res.data.meta.per_page
        this.courses = this.courses.concat(res.data.data)
      }
    }
  }
}
</script>

<style scoped>
  div {
    display: flex;
  }
  .main {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
  }
  .course-card {
    width: 100%;
    border: 1px solid black;
    overflow: hidden;
    margin: 10px;
  }
  .course-card__info {
    font-size: 12px;
    width: calc(100% - 153px - 20px);
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px;
  }
  .course-card__cover-image {
    display: block;
    background-repeat: no-repeat;
    
    width: 133px;
    height: 74px;
    margin: 10px;
  }
  .course-card__title {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .course-card__detail {
    justify-content: space-between;
  }
  @media (min-width: 768px) {
    .course-card__title {
      font-size: 20px;
      white-space: initial;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .course-card {
      width: 230px;
      flex-direction: column;
    }
    .course-card__cover-image {
      width: 230px;
      height: 138px;
      margin: 0px;
    }
    .course-card__info {
      box-sizing: border-box;
      width: 100%;
    }
  }
</style>