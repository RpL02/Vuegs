<template>
	<div class="container space-top">
		<form @submit.prevent="saveBug" >
			<div class="form-group">
				<label for="shortDescription">Titulo</label>
				<input  required="true" type="text" v-model="shortDescription" class="form-control" id="shortDescription" placeholder="Ingresa el nombre para tu bug">
			</div>
			<div class="form-group">
				<label for="os">SistemaOperativo</label>
			    <select v-model="os" class="form-control" id="os">
			      <option value="Android">Android</option>
			      <option value="iOS">iOS</option>
			      <option value="Editor">Editor</option>
			    </select>
			</div>
			<div class="form-group">
				<label for="type">Tipo de Bug</label>
			    <select required="true" v-model="type" class="form-control" id="type">
			      <option value="Texto">Texto</option>
			      <option value="Grafico">Grafico</option>
			      <option value="Funcional">Funcional</option>
			      <option value="Gameplay">Gameplay</option>
			    </select>
			</div>

			<div class="dropdown-divider"></div>

			<div class="form-group">
				<label for="longDescription">Descripcion</label>
				<textarea v-model="longDescription" class="form-control" id="longDescription" rows="3" placeholder="Ingresa una descripción del bug"></textarea>

				
			</div>
			<div class="form-group">
				<label for="priority">Prioridad</label>
			    <select v-model="priority" class="form-control" id="priority">
			      <option value="Minor">Minor</option>
			      <option value="Mayor">Mayor</option>
			      <option value="Critical">Critical</option>
			      <option value="Blocker">Blocker</option>
			    </select>
			</div>
			<div class="form-group">
				<label for="stepsToProduce">Pasos para reproducir</label>
				<input type="text" v-model="stepsToProduce" class="form-control" id="stepsToProduce" placeholder="Ingresa los pasos para reproducir el bug">
			</div>
			<div class="form-group">
				<label for="reproRate">ReproRate</label>
				<input type="text" v-model="reproRate" placeholder="1/10" class="form-control" id="reproRate">
			</div>
			
			 <div>
				<input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
  			</div>
  		  	<div>
    			<b-progress :value="value" variant="success" show-progress striped :animated="true" class="mb-2"></b-progress>
			</div>

		  <button type="submit" class="btn btn-primary">Enviar</button>
</form>
	</div>
</template>

<script>
	import { db, storage } from '../api/firebase'
	

	export default {
		name: 'FormBug',
		data(){
			return {
				value: 0,
				os: null,
				type: null,
				priority: null,
				shortDescription: null,
				longDescription: null,
				stepsToProduce: null,
				reproRate: null,
				bugImage: null,
				imageUrl: 'https://firebasestorage.googleapis.com/v0/b/kiteeducation-179216.appspot.com/o/bugs%2Fempty.png?alt=media&token=1c6d019d-232b-42da-98ea-98f7ec6bc9f5',
			}
		},
		methods: {
			handleFileUpload: function(){
				this.file = this.$refs.file.files[0];

				var storageRef = storage.ref('bugs/'+this.file.name);
                var uploadTask = storageRef.put(this.file)
                const self = this
				uploadTask.on('state_changed', function(snapshot){
				  self.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				}, function(error) {
				  // Handle unsuccessful uploads
				}, function() {
				 
				  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
				   	self.imageUrl = downloadURL
				  });
				});                
			},
			saveBug: function(){
				db.collection('Bugs').add({
					os: this.os,
					type: this.type,
					shortDescription: this.shortDescription,
					bugImage: this.imageUrl,
					longDescription: this.longDescription,
					priority: this.priority,
					stepToProduce: this.stepsToProduce,
					reproRate: this.reproRate,
					variant: 'danger',
					ticketId: Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6)
				})
				this.$router.push('/')
				
			}
		}
	}
</script>

<style>
	
</style>