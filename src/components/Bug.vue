<template>
	<div class="container center space-top">
		<h1>MakerQuest</h1>
		<button v-if="variant == 'danger'" type="button" class="btn btn-outline-success" v-on:click="updateBugStatus('success')">
			FixedUp
		</button>
		<button v-if="variant == 'danger'" type="button" class="btn btn-outline-secondary" v-on:click="updateBugStatus('secondary')">
			Wait
		</button>
		<button v-if="variant == 'secondary'" type="button" class="btn btn-outline-danger" v-on:click="updateBugStatus('danger')">
			Bug
		</button>
		<div class="row">
		  <div class="col-4 elements-space">
		  	<p><strong>OS: </strong>{{os}}</p>
		  </div>
		  <div class="col-4 elements-space">
		  	<p><strong>Titulo</strong><br>{{shortDescription}}</p>
		  </div>
		  <div class="col-4 elements-space">
		  	<p><strong>Bug: </strong>{{type}}</p>
		  </div>
		</div>
		<div class="row">
			<div class="col-6 elements-space">
				<p><strong>Descripción</strong><br>{{longDescription}}</p>
			</div>
			<div class="col-6 elements-space">
				<p><strong>Pasos para reproducir</strong><br>{{stepsToProduce}}</p>
			</div>
			<div class="col-6 elements-space">
				<p><strong>Prioridad: </strong>{{priority}}</p>
			</div>
			<div class="col-6 elements-space">
				<p><strong>ReproRate: </strong>{{reproRate}}</p>
			</div>
			<div class="col-6 elements-space center mx-auto">
				<p><strong>Ticket: </strong>{{ticketId}}</p>
			</div>
			<div class="col-12">
				<img v-bind:src="bugImage" alt="blank_" width="400px">
			</div>
		</div>

	</div>
</template>
<script>
	import { db } from '../api/firebase'
	export default {
		name: 'view-bug',
		data(){
			return {
				os: null,
				type: null,
				shortDescription: null,
				longDescription: null,
				priority: null,
				stepsToProduce: null,
				reproRate: null,
				variant: null,
				ticketId: null,
				bugImage: null
			}
		},
		beforeRouteEnter(to, from, next){
			db.collection('Bugs').where('ticketId', '==', to.params.bug_id)
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					next(vm => {
						vm.os = doc.data().os
						vm.type = doc.data().type
						vm.variant = doc.data().variant
						vm.shortDescription = doc.data().shortDescription
						vm.longDescription = doc.data().longDescription
						vm.priority = doc.data().priority
						vm.stepsToProduce = doc.data().stepToProduce
						vm.reproRate = doc.data().reproRate
						vm.bugImage = doc.data().bugImage
						vm.ticketId = doc.data().ticketId
					})
				})
			})
		},
		methods: {
			updateBugStatus(status){
				db.collection('Bugs').where('ticketId', '==', this.$route.params.bug_id)
				.get()
				.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					doc.ref.update({
						variant: status
					})
					.then(()=> {
						this.$router.push('/')
					})
				})
			})
			}
		}
	}
</script>
<style>
	.elements-space{
		margin-top: 30px;
	}
	.center{
		text-align: center;
	}
</style>