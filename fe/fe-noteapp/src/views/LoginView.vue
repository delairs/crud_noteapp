<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="form-group">
                <label for="email">Email:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
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
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (res.status === 401) {
          console.error("Unauthorized: Invalid credentials");
        } else {
          const json = await res.json();
          console.log(json);
          // Use Vue Router to navigate to the dashboard route
          this.$router.push("/note");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
};
</script>

<style>
/* Anda dapat menyesuaikan gaya sesuai kebutuhan */
.container {
  text-align: center;
}

.card {
  width: 100%;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
}

.btn-primary {
  margin-top: 10px;
}
</style>
