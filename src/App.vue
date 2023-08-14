<script setup>
  import {ref,reactive,onMounted, watch} from 'vue'
  import {uid} from 'uid'

  import Header from './components/Header.vue'
  import Formulario from './components/Formulario.vue'
  import Paciente from './components/Paciente.vue'
  
  const pacientes = ref([])
  const paciente = reactive({
    id:null,
    nombre:'',
    propietario:'',
    email:'',
    alta:'',
    sintomas:''
  })
  
  // ciclo de vida
  watch(pacientes,()=>{
    guardarLocalStorage()
  },{
    deep:true
  })
  // Local storage
  const guardarLocalStorage = ()=>{
    localStorage.setItem('pacientes',JSON.stringify(pacientes.value))

  }

  onMounted(()=>{
    const pacienteStorage = localStorage.getItem('pacientes')
    if(pacienteStorage){
      pacientes.value = JSON.parse(pacienteStorage)
    }
  })

  const guardarPacientes = () =>{
    // Registro que se edita
    if(paciente.id){
      const {id} = paciente
      const i = pacientes.value.findIndex(pacienteState => pacienteState.id === id )
      pacientes.value[i] = {...paciente}
    }
    // Registro que se crea
    else{
      // Agrega al arreglo reactivo ref el objecto paciente de reactive 
      // Al agregarle los ... se crea una copia y deja de ser reactivo
      pacientes.value.unshift({
                      // añade el id, generado por uid
        ...paciente,
        id:uid()
      })
    }

    // Reiniciar el objecto
    // del arreglo paciente, reemplaza sus datos 
    Object.assign(paciente,{
      nombre:'',
      propietario:'',
      email:'',
      alta:'',
      sintomas:'',
      id:null
    })
  }

  const actualizarPaciente = id =>{
    
    const pacienteEditar = pacientes.value.filter(paciente => paciente.id === id)[0]
    Object.assign(paciente,pacienteEditar)
  } 

  const eliminarPaciente = id =>{ 
    pacientes.value = pacientes.value.filter(paciente => paciente.id !== id)

  }



</script>

<template>
  <Header/>
  <div class="container p-2 mx-auto mt-5 ">

    <div class="mt-12 mx-1 md:flex ">
      <!-- v-model:nombre despues de los : es para cambiar el nombre del v-model -->
      <Formulario
        v-model:nombre="paciente.nombre"
        v-model:email="paciente.email"
        v-model:propietario="paciente.propietario"
        v-model:alta="paciente.alta"
        v-model:sintomas="paciente.sintomas"
        @guardar-paciente="guardarPacientes"
        :id="paciente.id"
      />

      <div class="md:w-1/2 bg md:h-screen overflow-y-auto  ">
        <h3 class="font-black rounded-lg h-16 bg-indigo-700 text-white text-5xl text-center">Administra tus Pacientes</h3>
        
        <div v-if="pacientes.length > 0">
          
          <p class=" text-4xl w-5/6  h-14 text-white font-bold  mt-3  text-center mb-10 ">
            Lista de tus
            Pacientes
          </p>

          <Paciente
          v-for="paciente in pacientes"
          :paciente="paciente"
          @actualizar-paciente="actualizarPaciente"
          @eliminar-paciente="eliminarPaciente"
          />
        </div>
        <p v-else class="mt-10 text-white text-2xl text-center">No hay pacientes</p>
      </div>

    </div>

  </div>
</template>


