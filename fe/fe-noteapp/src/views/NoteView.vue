<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Notes</div>
          <div class="card-body">
            <ul class="list-group">
              <li
                v-for="note in noteHistory"
                :key="note.id"
                class="list-group-item"
              >
                <div>
                  <input v-model="note.content" class="form-control" />
                  <div class="mt-2">
                    <button
                      @click="selectedUpdate(note.id, note.content)"
                      class="btn btn-primary mr-2"
                    >
                      Update
                    </button>
                    <button
                      @click="selectedDelete(note.id)"
                      class="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">Add Note</div>
          <div class="card-body">
            <form @submit.prevent="createNote">
              <div class="form-group">
                <label for="newNote">New Note:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newNote"
                  required
                />
              </div>
              <button type="submit" class="btn btn-success">Add Note</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import router from "../router";

export default {
  setup() {
    const currUser = ref(null);
    const noteHistory = ref([]);
    const newNote = ref("");
    const deleteID = ref("");
    const updateID = ref("");
    const newContent = ref("");

    const selectedDelete = async (id) => {
      deleteID.value = id;
      await deleteNote();
    };

    const selectedUpdate = async (id, content) => {
      updateID.value = id;
      newContent.value = content;
      await updateNote();
    };

    const editNote = (id) => {
      updateID.value = id;
    };

    const cancelEdit = () => {
      updateID.value = ""; // Batalkan mode edit
    };

    onBeforeMount(async () => {
      currUser.value = await getUser();
      if (!currUser.value) router.replace("/about");

      // Ambil riwayat catatan dari database saat komponen dimuat
      await fetchNoteHistory();
    });

    const getUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 401) {
          console.error("Unauthorized: Invalid credentials");
        } else {
          const json = await res.json();
          console.log(json);
          return json;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchNoteHistory = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/notes", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 401) {
          console.error("Unauthorized: Invalid credentials");
        } else {
          const json = await res.json();
          console.log(json);
          noteHistory.value = json.docs;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const createNote = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/notes", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserID: currUser.value.user.id,
            content: newNote.value,
          }),
        });
        if (res.status === 401) {
          console.error("Unauthorized: Invalid credentials");
        } else {
          const json = await res.json();
          console.log(json);
          router.go();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const deleteNote = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/notes/" + deleteID.value,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 401) {
          console.error("Unauthorized: Invalid credentials");
        } else {
          const json = await res.json();
          console.log(json);
          router.go();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const updateNote = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/notes/" + updateID.value,
          {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: newContent.value,
            }),
          }
        );
        if (res.status === 401) {
          console.error("Unauthorized: Invalid credentials");
        } else {
          const json = await res.json();
          console.log(json);
          router.go();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    return {
      currUser,
      noteHistory,
      fetchNoteHistory,
      getUser,
      newNote,
      createNote,
      deleteNote,
      selectedDelete,
      selectedUpdate,
      editNote,
      cancelEdit,
      updateNote,
    };
  },
};
</script>

<style>
/* Anda dapat menyesuaikan gaya sesuai kebutuhan */
.container {
  text-align: center;
  margin-top: 50px;
}

.card {
  margin-bottom: 20px;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
}
</style>
