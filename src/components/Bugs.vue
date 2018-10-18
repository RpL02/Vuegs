<template>
	<div class="container space-top">
        
        <div class="form-inline">
            <p class="left-space"><strong>Bugs: </strong>{{ bugs.length }} </p>
            <p class="left-space"><strong>Asignados: </strong>{{ getBugStatusNumber('info') }} </p>
            <p class="left-space"><strong>Corregidos: </strong>{{ getBugStatusNumber('success') }} </p>
            <p class="left-space"><strong>Espera: </strong>{{ getBugStatusNumber('secondary') }} </p>
        </div>

        <b-form-input placeholder="Search Bug: Type or TicketId" v-model="search"/>
        <br>
		<b-card-group deck class="mb-3" v-for="bug in filteredBugs" :key="bug.ticketId" v-bind:bug="bug">
	      <b-card v-bind:bg-variant="bug.variant"
	        text-variant="white"
	        class="text-center">
	        <p class="card-text"><strong>{{bug.shortDescription}}</strong></p>
            <p class="card-text">{{bug.longDescription}}</p>
            <div class="row" >
                <div class="col">
                    <p><strong>Prioridad: </strong>{{bug.priority}}</p>
                    
                </div>
                <div class="col">
                    <p><strong>Tipo: </strong>{{bug.type}}</p>
                </div>
                <div class="col">
                    <p><strong>Ticket: </strong>{{bug.ticketId}}</p>
                </div>
                
            </div>
	        <router-link class="btn btn btn-outline-light btn-sm" 
	        	v-bind:to="{name: 'view-bug', params: {bug_id: bug.ticketId}}">
	        	Revisar
	        </router-link>
            <button type="button" class="btn btn btn-outline-light btn-sm" v-on:click="updateBugStatus('success', bug.ticketId)">
                Fixedup
            </button>
            <button type="button" class="btn btn btn-outline-light btn-sm" v-on:click="updateBugStatus('secondary', bug.ticketId)">
            Wait
            </button>
            <button type="button" class="btn btn btn-outline-light btn-sm" v-on:click="updateBugStatus('info', bug.ticketId)">
                Assigned
            </button>
	    </b-card>
	    </b-card-group>
	</div>
</template>

<script>
	import { db } from '../api/firebase'
	export default {
		name: 'Bugs',
		data(){
			return {
				bugs: [],
				loading: false,
                search: ''
			}
		},
		firestore(){
			return{
				bugs: db.collection('Bugs').orderBy('variant')
			}
		},
        computed: {
            filteredBugs: function() {
                return this.bugs.filter((bug) => {
                    return bug.ticketId.match(this.search) || bug.type.match(this.search) || bug.shortDescription.match(this.search)
                }) 
            }
        },
        methods: {
            getBugStatusNumber(status){
                return this.bugs.filter(bug => bug.variant == status).length;
            },
            updateBugStatus(status, bugId){
                db.collection('Bugs').where('ticketId', '==', bugId)
                .get()
                .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        variant: status
                    })
                    .then(()=> {
                        
                    })
                })
            })
            }
        }
	}
</script>

<style>
.left-space{
    margin-left: 20px;
}
@keyframes placeHolderShimmer{
    0%{
      background-position: -468px 0
    }
    100%{
      background-position: 468px 0
    }
  }
  .animated-background__sub {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-name: placeHolderShimmer;
    animation-name: placeHolderShimmer;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: #eeeeee;
    background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #dddddd), color-stop(33%, #eeeeee));
    background: -webkit-linear-gradient(left, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    -webkit-background-size: 800px 104px;
    background-size: 800px 104px;
    height: 20px;
    width: 200px;
    position: relative;
  }
</style>