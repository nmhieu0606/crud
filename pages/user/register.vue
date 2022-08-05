<template>
  <div>
    <h1>Register {{this.check_fullname_Length}} {{thunghiem}}</h1>
    <hr>


    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

          <div class="form-group">
            <label for="">Full Name</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.full_name }"
              v-model="full_name">
            <div class="invalid-feedback" v-if="errors && errors.full_name">
              {{ errors.full_name.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Email</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.email }"
              v-model="email">
            <div class="invalid-feedback" v-if="errors && errors.email">
              {{ errors.email.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Password</label>
            <input type="password" class="form-control"
              :class="{ 'is-invalid': errors && errors.password }"
              v-model="password">
            <div class="invalid-feedback" v-if="errors && errors.password">
              {{ errors.password.msg }}
            </div>
          </div>

          <input type="submit" value="Register" class="btn btn-primary mr-3">
          <nuxt-link to="/" class="btn btn-secondary mr-3">Cancel</nuxt-link>

        </form>
      </div>
    </div>

    <button @click="countClick()" class="btn btn-primary"> Count test </button>
  </div>
</template>


<script>
// import myStore from "@/store/index"

export default {
  middleware: 'auth',
  auth: 'guest',
  data(){
    return{
      errors:null,
      full_name:'aaa',
      email:null,
      password:null,
      status:false,

      count: 0,
      thunghiem: 'sssssssss'
    }
  },

  methods:{

    countClick(){

      this.$store.commit('increment')
      // console.log(this.$store.getters.count)

    },
    getAnswer(){
      alert('Qua dai roi')
    },

    submitForm(){
      this.$axios.post( '/api/users/register', {
          full_name: this.full_name,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response)

          if(response.data.id){
            this.$router.push({ name:'user-login', params:{ registered:'yes' } })
            // log in if successfully registered
            this.$auth.loginWith('local', {
                data: {
                  email: this.email,
                  password: this.password
                }
              })
              .catch( (error) => {
                console.log(error)
              })
          }
        })
        .catch( (error) => {
          console.log(error)
          if(error.response.data.errors){
            this.errors = error.response.data.errors
          }
        });
    }
  },

  computed: {
    // a computed getter
    check_fullname_Length() {
      // `this` points to the component instance
      return this.full_name.length > 5 ? 'Yes' : 'No'
    }
  },

  watch: {
   
    full_name() {
      if (this.full_name != null && this.full_name.length > 10) {
        this.getAnswer()
      }
    }
  }

}
</script>

<style>


</style>