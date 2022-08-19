<template>
  <div>
    <!-- Button trigger modal -->
    <ThemDanhMuc @formThemSubmit="test" />
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
                <label for="exampleInputEmail1" class="form-label">danhmuc</label>
                <input v-model="danhmuc" type="text" class="form-control" id="exampleInputEmail1"
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
          <th scope="col">Danh mục</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="dm in data" :key="dm.id">
          <th scope="row">{{ dm.id }}</th>
          <td>{{ dm.danhmuc }}</td>

          <td><a @click="show(dm.id)" class="btn btn-primary">Sửa</a></td>
          <td><a @click="destroy(dm.id)" class="btn btn-danger">Xóa</a></td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>

import ThemDanhMuc from '@/components/danhmuc/them.vue'

export default {
  midleware: "auth",
  components: {
    ThemDanhMuc
  },

  data() {

    return {
      error: null,
      danhmuc: null,
      id: null,
      data: [],

    };
  },
  mounted() {

    this.loaddata();
  },

  methods: {

    loaddata() {
      this.$axios.get('/api/danhmuc').then(res => {
        this.data = res.data;
      });

    },
    show(id) {
      this.id = id;
      this.$axios.get('/api/danhmuc/' + id).then(res => {
        this.danhmuc = res.data.danhmuc;

        this.id = id;
        $('#modal-sua').modal('show');
      })

    },
   


   
    update() {

      this.$axios.put('/api/danhmuc/' + this.id, {
        id: this.id,
        danhmuc: this.danhmuc,

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
          this.$axios.delete('/api/danhmuc/' + id).then(res => {
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

    },
    test(e) {
      this.loaddata();
    }

  },





};
</script>
