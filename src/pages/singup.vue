<template>
  <div class="singup">
    <form>
      <div class="container text-values">
        <h1>Create Account</h1>
        <hr />
        <div class="row justify-content-center">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              placeholder="example@gmail.com"
              type="email"
              class="form-control justify-content-center text-center"
              id="email"
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else</small
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              v-model.trim="password"
              placeholder="minimum 8 characters"
              type="password"
              class="form-control text-center"
              id="password"
            />
            <input
              v-model.trim="passwordConfirm"
              placeholder="confirm password"
              type="password"
              class="form-control text-center"
              id="passwordConfirm"
            />
          </div>
          <div class="input-group row justify-content-center">
            <div class="input-group-prepend">
              <span class="input-group-text">Your name</span>
            </div>
            <input
              type="text"
              placeholder="Your name"
              class="form-control col-sm-3 text-center"
            />
            <input
              type="text"
              placeholder="Your nickname (optional)"
              class="form-control col-sm-3 text-center"
            />
            <small id="nickname" class="form-text text-muted"
              >if you want have unique ID</small
            >
          </div>
        </div>
      </div>
    </form>
    <button type="submit" class="btn btn-outline-dark">Submit</button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kufam:ital,wght@0,400;0,700;1,900&display=swap");

.text-title {
  font-family: "Kufam", cursive;
  font-size: 150%;
  width: 400;
}
.text-values {
  font-family: "Kufam", cursive;
  font-size: 100%;
}

button {
  margin: 20px 20px 20px 20px;
}
</style>
