
<script>
import * as tf from '@tensorflow/tfjs'
import * as enc from '@tensorflow-models/universal-sentence-encoder'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'skmeans/dist/browser/skmeans'
export default {
  name: 'summarise',
  data() {
    return {
      title: "Extractive summary demo",
      description: `This application summarises text by selecting, from the input passage, a desired number of sentences that sample the information in the text. A 500-word sample passage from abc.net.au is pre-loaded`,
      ml_enc: null,
      // question: "",
      passage: "",
      predictions: [],
      // history: [],
      summary: "",
      n_cluster: 3
    }
  },
  computed: {
    in_sentences() {
      const sents = this.passage.split('\n').map(s =>s.split('. '));
      return sents.flat().map(s => s.trim()).filter(s=> s!='');
    }
    ,
    predText() {
      return this.predictions.map(p => p.text)
    }

  },
  methods: {
    async summarise() {
      const embeddings = await this.ml_enc.embed(this.in_sentences);
      
      const arr = await embeddings.array();
      console.log(embeddings);
      const result = skmeans(arr, this.n_cluster, null, 20);
      console.log(result);
      let summary = [];
      for (const cluster in [...Array(this.n_cluster).keys()]) {
        const idxs = result.idxs.map((item, index) => item == cluster ? index : '').filter(e => e != '');
        const vectors = idxs.map(i => arr[i]);
        const proximity = vectors.map(v => Math.abs(tf.metrics.cosineProximity(tf.tensor1d(v), tf.tensor1d(result.centroids[cluster])).dataSync()[0]));
        const closest = Math.min(...proximity);
        const chosen = proximity.indexOf(closest);
        summary.push(idxs[chosen]);
      }
      // 
      summary = summary.sort((a, b) => a - b)
      console.log(summary);
      summary = summary.map(i => this.in_sentences[i]);
      this.summary = summary.join('. ');


    }, async getAnswers() {
      const ans = await this.ml.findAnswers(this.question, this.passage);
      console.log(ans);
      this.predictions = ans;
      this.history = [{ question: this.question, predictions: this.predictions }, ...this.history];
    },

  },
  async mounted() {
    const ml = await enc.load();
    this.ml_enc = Object.freeze(ml);//To prevent wrapping in proxy. 
    // console.log('mounted');
    this.passage = `Investing in Australia's commercial sea urchin industry could be the solution needed to tackle one of the Great Southern Reef's biggest environmental problems, a senate inquiry has been told.  The Great Southern Reef stretches from New South Wales to Tasmania and across to Western Australia.  Despite being native to New South Wales, long-spined sea urchins have degraded reefs and have also made their way into Victorian and Tasmanian waters, turning healthy marine environments into "urchin barrens".  The inquiry is investigating the issue, with submissions to it calling for more investment and support to help grow the commercial urchin harvesting industry.  The inquiry's chair, Tasmanian senator Peter Whish-Wilson, said the species was a pest in Tasmania and had wiped out most of the healthy kelp forests.  "With no predators, they proliferated," he said.  "Like little pac-men, they've munched their way through our offshore coastal ecosystems."  Demand for sea urchins is growing in Australia but the product is an "acquired taste", according to Sea Urchin Harvest director chief executive Chris Theodore.  Humans can consume the roe, also known as uni or kinna, which is found inside the urchin's shell.  The product is popular among Maori and Asian communities and there is also a demand for it across countries in Europe and Asia.  One teaspoon of roe can cost up to $40 in a Melbourne restaurant.  Mr Theodore has recently opened an exporting factory on the New South Wales far south coast to keep up with the growing demand.  But he said the government needed to provide the sector with more support to help it take off.  "It's good for the environment and employment but it's just needing the government to look at this issue," he said.  Abalone Association of NSW secretary John Smythe said the destruction caused by sea urchins in Southern Australia could be compared to the damage done by crown-of-thorns starfish in Queensland.  "Over-grazing of sea urchins can create a similar problem that we're seeing in the Great Barrier Reef," he said.  However, there has been less funding spent on the sea urchin problem, which Mr Smythe said needed to change.  "The submissions are calling for up to $50 million in funding," he said.  "It's not a big ask when you spread it out."  Traditional custodians have lived along the New South Wales coastline for thousands of years, passing down knowledge about their land and waters from generation to generation.  Despite this, Walbunja man and advocate for the New South Wales Aboriginal Fishing Rights Group Wally Stewart said they had been left out of the discussion.  "We want to fix up our waters, we want to have a say in management and we want to create some employment for our communities," he said.  "In the last 250 years, we haven't been able to have a say in management but we have a duty of care as traditional owners to maintain this land and water."  The inquiry will hold hearings early next year and a report is due in March.  The chair plans to take the committee for a dive to see the "urchin barrens" and kelp restoration work as part of the inquiry.`;
  }

}
</script>
<template>

  <main>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">{{ title }}</h1>
          <p class="lead text-muted">{{ description }}</p>

        </div>
      </div>
    </section>

    <div class="py-5 bg-light">

      <div class="container">
        <div class="row">
          <div class="col">

            <div class="form-group">
              <label for="txtPassage">Passage</label>
              <div id="divPassage" class="row"><textarea rows="10" name="txtPassage" placeholder="Passage"
                  v-model="passage"></textarea>
              </div>

              <div class="form-group">
                <label for="txtNumCluster">Summary setence count </label>
                <input name="txtNumCluster" type="number" min="2" max="8" v-model="n_cluster" />
              </div>

              <div class="form-group">
                <button class="btn btn-primary" v-on:click="summarise">Summarise</button>
              </div>
            </div>

            <div class="form-group" v-if="summary != ''">
              <label for="txtSummary">Summary</label>
              <div id="divSummary" class="row">
                <textarea rows="4" disabled id="txtSummary" placeholder="Passage" v-model="summary"></textarea>
              </div>
            </div>

            <div id="divLoading" v-if="ml_enc == null" class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.card {
  /* padding: 1em; */
  margin: 0.5em;
}
</style>
