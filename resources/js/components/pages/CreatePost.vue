<template>
    <div class="card gedf-card">
        <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Make
                        a publication</a>
                </li> 
                <li class="nav-item">
                    <a class="nav-link" id="images-tab" data-toggle="tab" role="tab" aria-controls="images" aria-selected="false" href="#images">Images</a>
                </li>
            </ul>
        </div>
        <div class="card-body">
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                    <div class="form-group">
                        <label class="sr-only" for="post">post</label>
                        <textarea class="form-control" id="post" rows="3" placeholder="What are you thinking?" v-model="postContent"></textarea>
                    </div>

                </div>
                <div class="tab-pane fade" id="images" role="tabpanel" aria-labelledby="images-tab">
                    <div class="form-group">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="customFile" @change="onFileSelected" accept="image/*">
                            <label class="custom-file-label" for="customFile">Upload image</label>
                            <img v-if="loadingImage" class="img-fluid" :src="loadingImage" alt="Image" style="max-width:100%;height: 150px;">
                        </div>
                    </div>
                    <div class="py-4"></div>
                </div>
            </div>
            <div class="btn-toolbar justify-content-between">
                <div class="btn-group">
                    <button type="submit" class="btn btn-primary" @click="addPost">share</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
          return {
            postContent: '',
            selectedFile: null,
            loadingImage: null,
          }
        },
        methods: {
            onFileSelected(event) {
                let image = event.target.files[0]
                let reader = new FileReader()
                reader.readAsDataURL(image)
                reader.onload = event => {
                  this.loadingImage = event.target.result
                }
                this.selectedFile = image
            },
            addPost() {
                this.$store.dispatch('addPost', {
                  content: this.postContent,
                  image: this.selectedFile
                })
                this.postContent = ''
                this.loadingImage = null
            },
        }
    }
</script>