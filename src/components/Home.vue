<template>
  <main>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">ML practical text applications</h1>
          <p class="lead text-muted">Text summarisation, matching questions to FAQ, and answering comprehension questions.</p>
          <p>
          <p class="text-muted"> https://github.com/moatazelqadi/text_ml_demos.git</p>
          </p>
        </div>
      </div>
    </section>
    <div class="album py-5 bg-light">

      <div class="container">
        <div v-for="item in items" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" >
          <div  class="col" >
            <div class="card shadow-sm">
              <img class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg"
                role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"
                v-bind:src="item.src" />
              <div class="card-body">
                <p class="card-text">{{ item.title }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <a v-if="!item.path && item.link" v-bind:href="item.link" target="_blank"
                      class="btn btn-sm btn-outline-secondary">See live</a>
                    <a v-if="item.path" v-bind:href="item.path" class="btn btn-sm btn-outline-secondary">Go to app</a>
                  </div>
                  <small class="text-muted">{{ item.tags.join(',') }}</small>
                </div>
              </div>
            </div>
          </div>
          <div  class="col" >
            {{ item.desc }}
</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Home',
  methods: {
  },
  data() {
    return {
      items: [
        {
          src: 'elqadi_summary.png',
          title: 'Summarising text with Machine Learning',
          desc: 'A machine learning project that summarises text by selecting, from the input passage, a desired number of sentences that sample the information in the text',
          tags: ['ML', 'NLP', 'appdev', 'js', 'vuejs'],
          link: 'https://elqadi.net/live_apps/deep_learning/summary/index.html',
          path: '/summary'


        },
        {
          src: 'elqadi_faq.png',
          title: 'Using Machine Learning to find answers in FAQ',
          desc: 'A natural language processing (NLP) project to retrieve the best answer from a FAQ list. The project is built on TesnorFlow for javascript (TFJS) and VueJS',
          tags: ['ML', 'NLP', 'appdev', 'js', 'vuejs'],
          path: '/faq'
        },
        {
          src: 'elqadi_qna.png',
          title: 'Answering questions with Machine Learning',
          desc: 'A natural language processing (NLP) project to answer comprehension questions on a text passage. The project is built on TesnorFlow for javascript (TFJS) and VueJS, the TF model is BERT pretrained on SQUAD 2.0 dataset.',
          tags: ['ML', 'NLP', 'appdev', 'js', 'vuejs'],
          link: 'https://elqadi.net/live_apps/deep_learning/qna/index.html',
          path: '/qna'
        },

      ]
    }
  }
};
import { RouterLink, RouterView } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
</script>
