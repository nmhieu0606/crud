<template >
    <div>


        <p>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-them"
                aria-expanded="false" aria-controls="collapseExample">
                Thêm sản phẩm
            </button>
        </p>
        <div class="collapse" id="collapse-them">
            <form id="form-them-1" @submit.prevent="them()">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Tên sản phẩm</label>
                    <input type="text" v-model="tensp" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp">

                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Gía Tiền</label>
                    <input type="text" v-model="giatien" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp">

                </div>
                <div class="mb-3">
                    <select v-model="danhmuc_id" class="form-select" aria-label="Default select example">
                        <option selected>Chọn danh mục</option>
                        <option v-for="dm in danhmuc" :value="dm.id">{{ dm.danhmuc }}</option>

                    </select>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Thêm danh mục
                    </button>

                </div>
                <div class="modal-footer">
                    <button type="button" data-bs-toggle="collapse" data-bs-target="#collapse-them"
                        class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                    <button type="submit" class="btn btn-success">Save</button>
                </div>

            </form>
        </div>
        <div class="collapse" id="collapse-sua">
            <form @submit.prevent="update()">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Tên sản phẩm</label>
                    <input type="text" v-model="tensp" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp">

                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Gía Tiền</label>
                    <input type="text" v-model="giatien" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp">

                </div>
                <div class="mb-3">
                    <select v-model="danhmuc_id" class="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option v-for="item in danhmuc" :selected="danhmuc_id == item.id" :value="item.id">
                            {{ item.danhmuc }}</option>

                    </select>
                    <ThemDanhMuc @formThemSubmit="themdanhmuc" />

                </div>


                <div class="modal-footer">
                    <button type="button" data-bs-toggle="collapse" data-bs-target="#collapse-sua"
                        class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Lưu</button>
                </div>

            </form>
        </div>



        <div class="mb-3">

            <input @change="search()" v-model="tukhoa" type="email" placeholder="Nhập tên sản phẩm" class="form-control"
                id="exampleInputEmail1" aria-describedby="emailHelp">

        </div>



        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Gía tiền</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item.id">
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item.tensp }}</td>
                    <td>{{ item.giatien }}</td>
                    <td><a @click="show(item.id)" class="btn btn-warning">Sửa</a></td>
                    <td><a @click="destroy(item.id)" class="btn btn-danger">Xóa</a></td>
                </tr>

            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li v-for="(i,count) in this.tongsopage" class="page-item"><a @click="page(count+1)" class="page-link"
                        href="#">{{count+1}}</a></li>

                <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
        </nav>
    </div>
</template>
<script>


import ThemDanhMuc from '@/components/danhmuc/them.vue'
import { count, log } from 'console';


export default {
    components: {
        ThemDanhMuc
    },
    middleware: 'auth',
    data() {
        return {
            data: [],
            tensp: null,
            giatien: null,
            id: null,
            danhmuc: [],
            tendanhmuc: null,
            danhmuc_id: null,
            tukhoa: null,
            tongsopage: [],
        }
    },
    mounted() {
        this.loaddata();
        this.loaddanhmuc();
    },
    methods: {
        loaddata() {
            this.$axios.get('/api/sanpham').then(res => {
                this.data = res.data.data;
                this.tongsopage = res.data.tongsopage;
                console.log(this.tongsopage);
            })
        },
        loaddanhmuc() {
            this.$axios.get('/api/danhmuc').then(res => {
                this.danhmuc = res.data;
            });

        },
        them() {

            var data = {
                tensp: this.tensp,
                giatien: this.giatien,
                danhmuc_id: this.danhmuc_id,
            };
            console.log(data);
            this.$axios.post('/api/sanpham', data).then(res => {
                if (res.status === 200) {
                    this.tensp = null;
                    this.giatien = null;
                    this.danhmuc_id = null;
                    this.loaddata();
                }
            })
        },
        themdanhmuc() {
            this.loaddanhmuc();

        },
        show(id) {
            this.$axios.get('/api/sanpham/' + id).then(res => {
                if (res.status === 200) {
                    this.id = id;
                    this.tensp = res.data.tensp;
                    this.giatien = res.data.giatien;
                    this.danhmuc_id = res.data.danhmuc_id;
                    $('#collapse-sua').collapse('show');
                }
            })
        },
        update() {
            var data = {
                tensp: this.tensp,
                giatien: this.giatien,
                danhmuc_id: this.danhmuc_id,
            };
            this.$axios.put('/api/sanpham/' + this.id, data).then(res => {
                if (res.status == 200) {
                    $('#modal-sua').modal('hide');
                    this.loaddata();
                }
            })
        },
        destroy(id) {
            this.$axios.delete('/api/sanpham/' + id).then(res => {
                if (res.status === 200) {

                    this.loaddata();

                }
            })
        },
        search() {
            this.$axios.get('/api/sanpham/timkiem/' + this.tukhoa).then(res => {
                if (res.status === 200) {
                    this.data = res.data;
                }

            });
        },
        page(count) {
            this.$axios.get('/api/sanpham?page='+count).then(res => {
                this.data = res.data.data;
                this.tongsopage = res.data.tongsopage;
                console.log(this.tongsopage);
            })
        }




    },
    watch: {

    }



}
</script>
<style >

</style>