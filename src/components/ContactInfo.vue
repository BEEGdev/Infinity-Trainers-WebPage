<script setup>
</script>

<template> 

<!-- Este componente es la información de contacto -->

<div class="grid grid-cols-1 place-items-center my-10 gap-10 text-center w-10/12 md:grid-cols-2  xl:w-8/12 2xl:w-6/12">
    <div class="bg-white flex flex-col rounded-md items-center shadow-lg">
        <span class="p-3 bg-[#016646] text-white font-bold rounded-t-md w-full">Horario</span>
        <p class="p-3 text-[#372100] w-10/12">
            6:00 a 23:30.<br>En cualquier zona de la Comunidad de Madrid
        </p>
    </div>  

    <div class="flex flex-col items-center gap-3">
        
        <span class="bg-white rounded-md w-full p-6 px-14 shadow-lg">
            E-mail: info@infinitytrainers.com<br>Teléfono : 111 111 111
        </span>
        <div class="grid grid-cols-3 gap-10">  <!-- Icono de whatsapp -->
            <a href="https://api.whatsapp.com/send?phone=111111111" class="m-auto stroke-[#016646] hover:stroke-[#016646] rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-inherit" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#016646" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                    <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                </svg>
            </a><!-- Icono de correo -->
            <a href="mailto:asdasds@gmail.com" class="m-auto stroke-[#016646] hover:stroke-[#016646] rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-inherit" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#009988" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                    <path d="M3 7l9 6l9 -6" />
                </svg>
            </a><!-- Icono de teléfono -->
            <a href="tel:111-111-111" class="m-auto stroke-[#016646] hover:stroke-[#016646] rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-inherit" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#009988" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                </svg>
            </a>
        </div>
    </div> 
</div>

</template>