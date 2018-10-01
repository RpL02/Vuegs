<template>
	<div class="container space-top">
        <b-form-input placeholder="Search Bug: Type or TicketId" v-model="search"/>
        <br>
		<b-card-group deck class="mb-3" v-for="bug in filteredBugs" :key="bug.ticketId" v-bind:bug="bug">
	      <b-card v-bind:bg-variant="bug.variant"
	        text-variant="white"
	        class="text-center">
	        <p class="card-text"><strong>{{bug.shortDescription}}</strong></p>
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
	        	revisar
	        </router-link>
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
                    return bug.ticketId.match(this.search) || bug.type.match(this.search);
                }) 
            }
        }
	}
</script>

<style>
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