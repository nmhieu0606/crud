<template >
    <div>
        <p>

            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
                aria-expanded="false" aria-controls="collapseExample">
                Tạo hóa đơn
            </button>
        </p>
        <div class="collapse" id="collapseExample">
            <div class="cart cart-body">
                <form @submit.prevent="taoHoaDon">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Khách hàng</label>
                        <select @change="show($event)" class="selectpicker form-select" data-live-search="true">
                            <option>--Chọn Khách hàng--</option>
                            <option v-for="kh in list_kh" :value="kh.id" :data-tokens="kh.hovaten">{{ kh.hovaten }}
                            </option>

                        </select>

                        <khachhHangthem @them="load_kh" />

                    </div>

                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Địa chỉ</label>
                        <input disabled type="text" v-model="diachi" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp">

                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">SDT</label>
                        <input disabled type="text" v-model="sdt" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp">

                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input disabled type="text" v-model="email" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp">

                    </div>

                    <button type="submit" class="btn btn-success">Tạo</button>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Chọn sản phẩm
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div style="text-align: center;" v-for="i of cart"
                                            class="alert alert-info col-md-3 me-3" role="alert">

                                            <p>{{ i.tensp }} x {{ i.soluong }}</p>
                                            <p>Thành tiền: {{ i.thanhtien }}</p>
                                            <button @click.prevent="down(i.id)" class="btn btn-success">-</button>
                                            <button @click.prevent="up(i.id)" class="btn btn-success">+</button>
                                            <button @click.prevent="remove_item(i.id)" class="btn btn-danger">X</button>
                                        </div>
                                    </div>
                                    <div class="row">

                                        <div v-for="sp in list_sp" class="cart col-md-3" style="width: 18rem;">

                                            <div @click="add_giohang(sp.id)" class="cart-body">
                                                <h5 class="cart-title">{{ sp.tensp }}</h5>
                                                <a class="btn btn-danger">Thêm vào giỏ</a>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Close</button>

                                </div>
                            </div>
                        </div>
                    </div>


                </form>
            </div>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Họ tên khách hàng</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data" :key="index">
                    <th scope="row">{{ index }}</th>
                    <td>{{ item.hovaten }}</td>

                    <td>{{ item.tongtien }}</td>
                    <td v-for="i in item.chitiet_hd">{{ i.tensp }}</td>






                </tr>
            </tbody>
        </table>


        <!-- Modal -->




    </div>
</template>
<script>
import khachhHangthem from '@/components/khachhang/them.vue'
import { kStringMaxLength } from 'buffer';
import { off } from 'process';
export default {


    components: {
        khachhHangthem,

    },
    midleware: 'auth',
    data() {
        return {
            list_kh: [],
            khachhang_id: null,
            hovaten: null,
            email: null,
            diachi: null,
            sdt: null,
            list_sp: [],
            tensp: null,
            id_sp: null,
            soluong: null,
            cart: this.$store.getters.cart,
            data: [],

        }
    },
    mounted() {

        this.load_kh();
        this.load_sp();
        this.loaddata();

        // this.giohang=JSON.parse(localStorage.getItem('giohang')||"[]");
    },
    computed: {





    },


    methods: {
        load_kh() {
            this.$axios.get('/api/khachhang').then(res => {
                this.list_kh = res.data;
            });
        },





        remove_item(id) {
            for (let i of this.cart) {
                if (i.id === id) {
                    this.cart.splice(i, 1);
                }

            }

        },



        show(e) {
            var id = e.target.value;
            this.$axios.get('/api/khachhang/' + id).then(res => {
                this.diachi = res.data.diachi;
                this.sdt = res.data.sdt;
                this.email = res.data.email;
                this.khachhang_id = res.data.id;
            })
        },
        load_sp() {
            this.$axios.get('/api/sanpham').then(res => {
                this.list_sp = res.data;
            });
        },

        add_giohang(id) {
            let exists = false;
            for (let item of this.cart) {
                if (item.id == id) {
                    item.soluong += 1;
                    return exists = true;
                }

            }
            if (!exists) {
                this.$axios.get('/api/sanpham/' + id).then(res => {
                    this.$store.commit('addToCart', {
                        id: id,
                        tensp: res.data.tensp,
                        giatien: res.data.giatien,
                        thanhtien: res.data.giatien,
                        soluong: 1,
                    })

                });
            }


        },
        up(id) {

            for (let item of this.cart) {
                if (item.id == id) {
                    item.soluong += 1;

                }
            }

        },
        down(id) {

            for (let item of this.cart) {
                if (item.id == id) {
                    item.soluong -= 1;

                }
            }

        },
        taoHoaDon() {
            var tongtien = 0;
            for (let i of this.cart) {
                tongtien += i.thanhtien;
            }
            var hoadon = {
                khachhang_id: this.khachhang_id,
                nhanvien_id: this.$auth.user.id,
                tongtien: tongtien,
                chitiet_hd: JSON.stringify(this.cart),

            }
            this.$axios.post('/api/hoadon', hoadon).then(res => {

            })



        },

        loaddata() {
            let hoadon = [];
            this.$axios.get('/api/hoadon').then(res => {

                //const result = this.list_kh.map(v => ({ ...v, ...hoadon.find(sp => sp.khachhang_id === v.id) }));
                //this.data = result;
                // let test = this.list_kh.map(kh => {
                //     let u = hoadon.find(hd => {
                //         if (hd.khachhang_id == kh.id) {
                //            return{
                //                 id:hd.id,
                //                 khachhang_id:kh.hovaten
                //            }
                //         }
                //     })

                // });
                // console.log(test);
                hoadon = res.data;
                let t = hoadon.map(r => {
                    let c = this.list_kh.find(kh => kh.id === r.khachhang_id);
                    return {
                        id: r.id,
                        hovaten: c.hovaten,
                        chitiet_hd:r.chitiet_hd != null ? JSON.parse(r.chitiet_hd) : '',

                    }


                });
                this.data = t;





                // let map = result.map(v => {
                //     return{
                //         id:v.id,
                //         khachhang:v.hovaten,
                //         chitiet_hd:v,
                //     }

                // });




            });


        }

    },
    watch: {
        cart: {
            handler(item) {
                for (let i of item) {
                    if (i.soluong == 0) {
                        this.cart.splice(i, 1);
                    }
                    i.thanhtien = i.giatien * i.soluong;
                }

            },
            deep: true,
        }


    }


}
</script>
