<template>
  <div class="login">
    <form>
      <div class="container text-values">
        <div class="justify-content-center marg20 ">
          <p>If you haven't account, press =></p>
          <router-link to="/singup">
            <button type="submit" class="btn btn-outline-dark">
              Create account
            </button>
          </router-link>
        </div>
        <div class="row justify-content-center">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control col-sm"
              id="exampleInputPassword1"
            />
          </div>
        </div>
        <router-link to="/user/s">
          <button type="submit" class="marg20 btn btn-outline-dark">
            Log in
          </button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style>
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

.marg20 {
  margin: 20px 20px 20px 20px;
}
</style>
