<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API = "http://localhost:8080/api/products"

const products = ref([])
const form = ref({
  id: "",
  name: "",
  price: "",
  createDate: ""
})

// load data
const loadData = async () => {
  const res = await axios.get(API)
  products.value = res.data
}

// create
const createProduct = async () => {
  await axios.post(API, form.value)
  loadData()
}

// delete
const deleteProduct = async (id) => {
  await axios.delete(API + "/" + id)
  loadData()
}

// edit
const editProduct = (p) => {
  form.value = { ...p }
}

// update
const updateProduct = async () => {
  await axios.put(API + "/" + form.value.id, form.value)
  loadData()
}

// reset
const resetForm = () => {
  form.value = { id:"", name:"", price:"", createDate:"" }
}

onMounted(loadData)
</script>

<template>
  <h2>Product Manager</h2>

  <input v-model="form.id" placeholder="ID" />
  <input v-model="form.name" placeholder="Name" />
  <input v-model="form.price" placeholder="Price" />
  <input v-model="form.createDate" type="date" />

  <br>

  <button @click="createProduct">Create</button>
  <button @click="updateProduct">Update</button>
  <button @click="resetForm">Reset</button>

  <table border="1">
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Price</th>
      <th>Date</th>
      <th>Action</th>
    </tr>

    <tr v-for="p in products" :key="p.id">
      <td>{{ p.id }}</td>
      <td>{{ p.name }}</td>
      <td>{{ p.price }}</td>
      <td>{{ p.createDate }}</td>
      <td>
        <button @click="editProduct(p)">Edit</button>
        <button @click="deleteProduct(p.id)">Delete</button>
      </td>
    </tr>
  </table>
</template>