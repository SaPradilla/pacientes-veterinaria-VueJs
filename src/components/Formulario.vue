<script setup>
    import {reactive,computed} from 'vue'
    import Alerta from './Alerta.vue'

    const alerta = reactive({
        tipo:'',
        mensaje:''
    })

    //Eventos personalizados
    const emit = defineEmits(['update:nombre','update:propietario','update:email','update:alta','update:sintomas','guardar-paciente'])

    const props = defineProps({
        id:{
            // [String,null] se refiere a que puede ser string o null
            type:[String,null],
            required:true
        },
        nombre:{
            type:String,
            required:true
        },
        propietario:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        alta:{
            type:String,
            required:true
        },
        sintomas:{
            type:String,
            required:true
        }
    })

    const validar = () =>{
        //Quita la accion por defecto del boton submit
        // e.preventDefault()   

        if(Object.values(props).includes('')){
            alerta.mensaje = 'Todos los campos son obligatorios'
            alerta.tipo = 'error'            
            return 
            //se detiene la ejecución  
        }
        emit('guardar-paciente')
        alerta.mensaje = 'Paciente Guardado Correctamente.'
        alerta.tipo = 'exito'

        //Después de 3 segundos se limpia la alerta
        // Sus valores se reinician
        setTimeout(()=>{
            Object.assign(alerta,{
                tipo:'',
                mensaje:''
            })
        },2500)
    }   
    // Cuando se presiona el boton de submit y hace el evento de guardar-paciente 
    // y ya tenemos un id, quiere decir que ese registro será para editar
    // Si props en ese momento tiene un id, retornará true
    const editando = computed(()=>{
        return props.id
    })

</script>

<template>
    
    <div class="md:w-1/2 ">
        <h2 class="font-black rounded-lg h-16 bg-indigo-700 text-white text-5xl text-center">Seguimiento Pacientes</h2>
        <p class="text-4xl mt-5 h-14 text-white font-bold text-center mb-10 ">
            Añade Pacientes y
        Adminístralos
        </p>
        <Alerta
            v-if="alerta.mensaje"
            :alerta="alerta"
        />
        <form action="" class=" bg-white/80 shadow-lg rounded-lg py-10 px-5 mb-10"
            @submit.prevent="validar"
        >
        <!-- Nombre paciente -->
            <div class="mb-5">
                <label for="mascota" class="block text-black uppercase font-bold ">
                    Nombre Mascota
                </label>
                <input id="mascota" type="text" placeholder="Nombre de la mascota" class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                @input="$emit('update:nombre',$event.target.value)"
                :value="nombre"
                />
            </div>
        <!-- Nombre propietario -->
            <div class="mb-5">
                <label for="propietario" class="block text-black uppercase font-bold ">
                    Nombre Propietario
                </label>
                <input id="propietario" type="text" placeholder="Nombre del propietario" class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                @input="$emit('update:propietario',$event.target.value)"
                :value="propietario"
                />
            </div>
        <!-- Email -->
            <div class="mb-5">
                <label for="email" class="block text-black uppercase font-bold ">
                    Email
                </label>
                <input id="email" type="email" placeholder="Email del propietario" class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                @input="$emit('update:email',$event.target.value)"
                :value="email"
                />
            </div>
        <!-- Alta -->
            <div class="mb-5">
                <label for="alta" class="block text-black uppercase font-bold ">
                    Alta
                </label>
                <input id="alta" type="date" class="border-2 w-full p-2 mt-2 placeholder-gray-400  "
                @input="$emit('update:alta',$event.target.value)"
                :value="alta"
                
                />
            </div>
        <!-- Sintomas -->
            <div class="mb-5">
                <label for="sintomas" class="block text-black uppercase font-bold ">
                    Sintomas
                </label>
                <textarea id="sintomas" placeholder="Describe los sintomas" class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md h-50"
                @input="$emit('update:sintomas',$event.target.value)"
                :value="sintomas"
                />
            </div>

            <input 
            type="submit"
            class=" w-full p-3 text-white uppercase font-bold  cursor-pointer transition-colors  "
            :value="[editando ? 'Guardar Cambios' : 'Registrar Paciente']"
            :class="[editando ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-800']"
            />
        </form>
    </div>
</template>

