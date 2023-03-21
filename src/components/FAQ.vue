
<script>
import * as tf from '@tensorflow/tfjs'
import * as enc from '@tensorflow-models/universal-sentence-encoder'
import 'bootstrap/dist/css/bootstrap.min.css'
import { embedding } from '@tensorflow/tfjs-layers/dist/exports_layers'
export default {
    name: 'faq',
    data() {
        return {
            title: "Retrieving from a FAQ list",
            description: `This application answers a question by retrieving the semantically closest answer (i.e. not by keywords) from a list of frequently asked questions (FAQ).Each question in the list is preceded by #`,
            ml_enc: null,
            question: "",
            passage: "",
            predictions: [],
            history: [],
        }
    },
    computed: {
        in_sentences() {
            const sents = this.passage.split('\n').map(s => s.split('. '));
            return sents.flat().map(s => s.trim()).filter(s => s != '');
        }
        ,
        in_paragraphs() {
            const paras = this.passage.split('#');
            return paras;
        }

    },
    methods: {
        async answer() {

            const embeddings = await this.ml_enc.embed(this.in_sentences);
            // console.log(embeddings);

            const embeddings2 = await this.ml_enc.embed(this.question);
            // console.log(embeddings2);


            const scores = tf.matMul(embeddings, embeddings2, false, true).dataSync();
            // console.log(scores);
            const bestScore = Math.max(...scores);
            const bestIndex = scores.indexOf(bestScore);
            const bestSentence = this.in_sentences[bestIndex];
            // bestSentence = bestSentence.replace('#','');
            const bestPara = this.in_paragraphs.filter(par => par.indexOf(bestSentence.replace('#', '')) > -1)[0];
            this.history = [{ question: this.question, predictions: [bestPara] }, ...this.history];
            // console.log(bestPara);
        },


    },
    async mounted() {
        const ml = await enc.load();
        this.ml_enc = Object.freeze(ml);//To prevent wrapping in proxy. 
        // console.log('mounted');
        this.passage = `# What does a programmer do?
A programmer writes software

# What does a real estate developer do?
A real estate developer builds real estate`;

this.question = "What is  a software developer?"
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
                            <label for="txtPassage">FAQ</label>
                            <div id="divPassage" class="row"><textarea rows="10" name="txtPassage"
                                    placeholder="# Question&#10;Answer paragraph&#10;..." v-model="passage"></textarea>
                            </div>
                        </div>



                        <div class="form-group">
                            <label for="txtQuestion">Query</label>
                            <div id="divQuestion" class="row">
                                <textarea rows="4" id="txtQuestion" placeholder="Question?"
                                    v-model="question"></textarea>
                            </div>
                        </div>

                        <div class="form-group" v-if="ml_enc != null">
                            <button class="btn btn-primary" v-on:click="answer">Retrieve Answer from FAQ</button>
                        </div>

                        <div id="divLoading" v-if="ml_enc == null" class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>

                    </div>

                </div>
                <div class="row">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div v-for="h in history">
                            <div class="card">
                                <div class="card-header text-white bg-secondary">
                                    {{ h.question }}
                                </div>
                                <div class="card-body">
                                    <textarea disabled v-model="h.predictions"></textarea>
                                </div>
                            </div>
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

textarea {
    width: 100%;
}
</style>
