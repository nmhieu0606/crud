<template>
    <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-them">
            Thêm
        </button>

        <!-- Modal -->
        <div class="modal fade" id="modal-them" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="formThemSubmit()">
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
    </div>
</template>
<script>
export default {

    data() {
        return {
            hovaten: null,
            email: null,
            diachi: null,
            sdt: null,
        }
    },
    methods: {
        formThemSubmit() {

            this.$axios.post('/api/khachhang', {
                hovaten: this.hovaten,
                email: this.email,
                sdt: this.sdt,
                diachi: this.diachi
            }).then(res => {
                if (res.status === 200) {
                    $('#modal-them').modal('hide');
                    this.$emit('them',200);

                }
                else {

                }
            })
        },
    },
}
</script>
<style >
</style>