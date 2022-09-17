<template>
  <div>
    <!-- Button trigger modal -->
    <khachHangThem @them="them" />
    <div class="modal fade" id="modal-sua" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">UPDATE</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="update()">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Hovaten</label>
                <input v-model="hovaten" type="text" class="form-control" id="exampleInputEmail1"
                  aria-describedby="emailHelp">

              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">diachi</label>
                <input v-model="diachi" type="text" class="form-control" id="exampleInputEmail1"
                  aria-describedby="emailHelp">

              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">sdt</label>
                <input v-model="sdt" type="text" class="form-control" id="exampleInputEmail1"
                  aria-describedby="emailHelp">

              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">email</label>
                <input v-model="email" type="text" class="form-control" id="exampleInputEmail1"
                  aria-describedby="emailHelp">

              </div>
              <div class="modal-footer">

                <button type="submit" class="btn btn-primary">Save changes</button>
              </div>

            </form>

          </div>

        </div>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Họ và tên</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">SDT</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="kh in data" :key="kh.id">
          <th scope="row">{{ kh.id }}</th>
          <td>{{ kh.hovaten }}</td>
          <td>{{ kh.diachi }}</td>
          <td>{{ kh.sdt }}</td>
          <td>{{ kh.email }}</td>
          <td><a @click="show(kh.id)" class="btn btn-primary">Sửa</a></td>
          <td><a @click="destroy(kh.id)" class="btn btn-danger">Xóa</a></td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
import { log } from "console";
import { auth } from "../../nuxt.config";

import khachHangThem from '@/components/khachhang/them.vue'
export default {
  components:{
    khachHangThem,
  },
  midleware: "auth",

  data() {
    return {
      error: null,
      hovaten: null,
      email: null,
      diachi: null,
      sdt: null,
      id: null,
      data: [],

    };
  },
  mounted() {

    this.loaddata();
  },

  methods: {


    loaddata() {
      this.$axios.get('/api/khachhang').then(res => {
        this.data = res.data;
      });

    },
    them(){
      this.loaddata();

    },
    show(id) {
      this.id = id;
      this.$axios.get('/api/khachhang/' + id).then(res => {
        this.hovaten = res.data.hovaten;
        this.sdt = res.data.sdt;
        this.diachi = res.data.diachi;
        this.email = res.data.email;
        this.id = id;
        $('#modal-sua').modal('show');
      })

    },


   
    update() {

      this.$axios.put('/api/khachhang/' + this.id, {
        id: this.id,
        hovaten: this.hovaten,
        email: this.email,
        sdt: this.sdt,
        diachi: this.diachi
      }).then(res => {
        if (res.status === 200) {

          this.loaddata();
          $('#modal-sua').modal('hide');

          const Toast = this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$swal.stopTimer)
              toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: res.data.message,
          });

        }
        else {
          const Toast = this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$swal.stopTimer)
              toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: res.data.err,
          });


        }
      })
    },
    destroy(id) {

      this.$swal.fire({
        title: 'Bạn có chắc muốn xóa nó?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.delete('/api/khachhang/' + id).then(res => {
            if (res.status === 200) {
              this.loaddata();
              const Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', this.$swal.stopTimer)
                  toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'success',
                title: res.data.message,
              });

            }
          })

        }
      })

    }

  },





};
</script>
