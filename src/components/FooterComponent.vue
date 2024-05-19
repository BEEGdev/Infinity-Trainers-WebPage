<script setup>
</script>

<template>

    <!-- Este es el footer de la página -->

    <footer class="w-100 grid xl:grid-cols-3 bottom-0 bg-[#016646]  text-white">

        <nav class="p-10 xl:p-0 flex flex-col items-center gap-10 justify-center">  <!-- Nav con el link al home en el logo -->
            <router-link to="/"><span class=""><img src="https://d2hbcuqreawz28.cloudfront.net/logo-alt.png" alt="Infinity Trainers Logo" class="h-28 m-auto xl:m-0 xl:h-26"></span></router-link>
            <span class="text-center text-4xl">Infinity Trainers</span>   
        </nav>

        <div class="flex flex-row gap-5 items-center justify-center">  <!-- Link a instagram -->
					<a href="https://www.instagram.com/infinity_trainers_/">
						<svg xmlns="http://www.w3.org/2000/svg" class="transition duration-300 border-b-4 border-transparent hover:border-white rounded-b" width="52" height="52" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
							<path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
							<path d="M16.5 7.5l0 .01" />
						</svg>
					</a>
					<a href="https://www.facebook.com/profile.php?id=61550704021113&locale=es_ES"> <!-- Link a facebook -->
						<svg xmlns="http://www.w3.org/2000/svg" class="transition duration-300 border-b-4 border-transparent hover:border-white rounded-b" width="50" height="50" viewBox="0 0 24 24" stroke-width="1.2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
						</svg>
					</a>
				</div>

        <div class="p-12 xl:pr-28 xl:mr-10">
            <nav class="">    <!-- Nav con enlaces a todas las partes de la web -->
                <ul class="text-center xl:text-right flex-col text-2xl"> 
                    <router-link to="/"><li class="pb-6 hover:underline cursor-pointer">Inicio</li></router-link>
                    <router-link to="/programs"><li class="pb-6 hover:underline cursor-pointer">Nuestros entrenamientos</li></router-link>
                    <router-link to="/aboutus"><li class="pb-6 hover:underline cursor-pointer">Sobre nosotros</li></router-link>
                </ul>
            </nav>
        </div>

    </footer>
</template>
