<template>
		<div class="container space-top">
		<b-card-group deck class="mb-3" v-for="cell in cells" :key="cell.manager" v-bind:bug="cell">
	      <b-card v-bind:bg-variant="cell.status"
	        text-variant="white"
	        v-bind:header="cell.cell"
	        class="text-center">
	        <p class="card-text">{{cell.manager}}</p>
	        <b-button class="btn btn btn-outline-light btn-sm" 
	        	v-if="cell.status == 'danger'"
	        	v-on:click="updateCellStatus(cell.manager, 'success')">
	        	Ready
	        </b-button>
	        <b-button class="btn btn btn-outline-light btn-sm" 
	        	v-if="cell.status == 'success'"
	        	v-on:click="updateCellStatus(cell.manager, 'danger')">
	        	Building
	        </b-button>
			</b-card>
	    </b-card-group>
	</div>
</template>
<script>
import { db } from '../api/firebase'
	export default {
		name: 'view-build',
		data(){
			return {
				cells: []
			}
		},
		methods: {
			updateCellStatus(manager, status){
				db.collection('Cells').where('manager', '==', manager)
					.get()
					.then(querySnapshot => {
						querySnapshot.forEach(doc => {
							doc.ref.update({
								status: status
							})
						.then(()=> {
							console.log('jalo')
						})
					})
				})
			}
		},
		firestore(){
			return{
				cells: db.collection('Cells')
			}
		}
	}
</script>
<style>

</style>