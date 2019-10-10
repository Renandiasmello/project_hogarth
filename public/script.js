var vue_instance = new Vue({
    el: '#app',
    data() {
        return {
            books: [],
            book: {
                id: null,
                title: '',
                author: '',
                action: 'New'
            }
        }
    },
    methods: {
        save() {
            if(!this.book.title.trim() || !this.book.author.trim()){
                $('#pending').fadeIn();
                $('#delete').fadeOut();
                $('#saved').fadeOut();
                return false;
            }
            const form = new FormData();
            form.append('title', this.book.title);
            form.append('author', this.book.author);
            if(this.book.id){
                form.append('id', this.book.id);
            }

            const promise = fetch('./api.php', {
                method: 'POST',
                body: form
            })

            promise.then((response) => {
                const data = response.json();
                if (response.status == 422) {
                    alert(data.msg);
                } else {
                    $('#saved').fadeIn();
                    $('#delete').fadeOut();
                    $('#pending').fadeOut();
                    this.list();
                }
                /*this.book = {};*/
                this.book.id = null;
                this.book.title = '';
                this.book.author = '';
                this.book.action = 'New';
            });
        },
        list() {
            const promise = fetch('./api.php')

            promise.then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.books = data.data;
                })
        },
        put(book) {

            if(!this.book.id){
                this.book.id = book.id;
                this.book.title = book.title;
                this.book.author = book.author;
                this.book.action = 'Edit';
            } else {
                alert('There is already a record being edited');
                return false;
            }

        },
        del(id) {

            if(confirm('Do you really want to delete the record?')){

                const promise = fetch('./api.php?del=' + id)

                promise.then((response) => response.json())
                    .then((data) => {
                        this.list();
                        $('#delete').fadeIn();
                        $('#saved').fadeOut();
                        $('#pending').fadeOut();
                    })
            } else {
                $('#delete').fadeOut();
                $('#saved').fadeOut();
                $('#pending').fadeOut();
            }
           
        }
    },
    watch: {
        'book.title': function (val) {
            if(this.book.title.length > 1){
                $('#delete').fadeOut();
                $('#saved').fadeOut();
                $('#pending').fadeOut();
            }
        },
        'book.author': function (val) {
            if(this.book.title.length > 1){
                $('#delete').fadeOut();
                $('#saved').fadeOut();
                $('#pending').fadeOut();
            }
        }
    },
    mounted() {
        this.list();
    },
    template: `
    <div class="container">
        <div>
            <h3>{{book.action}} Book</h3>
            
            <form @submit.prevent="save()">
                <div class="form-group row">
                    <div class="col-md-4 mb-4 mb-lg-0">
                        <input type="text" class="form-control" placeholder="Title" v-model="book.title" required>
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" placeholder="Author" v-model="book.author" required>
                    </div>
                    <input type="hidden" v-model="book.id">
                    <input type="submit" class="btn btn-primary text-white" value="Save" :disabled="!book.title || !book.author">
                    </div>
            </form>
            
        </div>
        <br>
        <div>
            <div class="alert alert-danger" style="display: none;" id="delete">Record successfully deleted</div>
            <div class="alert alert-success" style="display: none;" id="saved">Record successfully saved</div>
            <div class="alert alert-danger" style="display: none;" id="pending">There is pending information, please check the fields</div>
            <div class="panel-heading">
                <h3 class="panel-title">Book List</h3>
            </div>
            <table class="table table-bordered table-striped table-hover" id="dev-table">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th colspan="2" class="text-center">Actions</th>
                    </tr>
                 </thead>
                 <tbody>
                    <template v-if="books.length">
                        <tr v-for="book in books">
                            <td>{{ book.id }}</td>
                            <td>{{ book.title }}</td>
                            <td>{{ book.author }}</td>
                            <td class="text-center"><a href="" @click.prevent="put(book)"><i class="fas fa-edit"></i></a></td>
                            <td class="text-center"><a href="" @click.prevent="del(book.id)"><i class="fas fa-trash-alt"></i></a></td>
                        </tr>
                    </template>
                    <template v-if="!books.length">
                        <tr>
                            <td colspan="5">No records to display.</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
    `
});