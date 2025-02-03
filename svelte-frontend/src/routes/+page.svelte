<script lang="ts">
  import DestinationBox from "./components/DestinationBox.svelte";
  
  

  let responseData:unknown = null;
  let error:string | null = null;

  async function handleSubmit(event: SubmitEvent) {


      const form = event.target as HTMLFormElement;

      const formData = new FormData(form);

      const text = formData.get("text");

      const data = {
        body: text
      }

      const request_body = JSON.stringify(data);
      console.log(request_body);

      try {

        const response = await fetch('https://search.jarenmchugh.com/search', {
          method: 'POST',
          body: request_body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = response.json();
        console.log(result)
        error = null;

      } catch (err) {
        
        if (err instanceof Error) {
          error = err.message;
        } else {
          error = "An unknown error occurred";
        }
        responseData = null;
        
      }
    }

</script>


<main class="h-screen w-screen m-0 absolute overflow-hidden">
  <img src="/header.jpg" alt="Scenic Ocean Beach" class="m-auto min-h-full object-cover object-bottom">
  <div class="h-screen w-screen absolute top-0 flex flex-col">
    <h1 class="text-white w-screen text-center font-Roboto font-medium mt-[30px] text-4xl md:text-6xl lg:text-8xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
      Find Your Dream Destination
    </h1>
    <form on:submit|preventDefault={handleSubmit}
      method="POST"
      class=" w-min-fit mx-4 md:w-3/4 xl:w-1/3 md:mx-auto flex flex-row mt-10 overflow-hidden resize-none bg-white rounded-2xl items-center drop-shadow-lg">
      <input type="text" name="text" placeholder="Describe your dream destination" class="w-full p-2 text-wrap text-lg h-full"/>
      <button class="text-lg px-4 flex flex-row justify-center text-center items-center" type="submit">
        <img src="search.svg" alt="search" class="h-6 opacity-50 hover:opacity-80 cursor-pointer">
      </button>
    </form>
    <div class="grow mb-10 p-8 py-8 flex flex-col overflow-scroll md:flex-row md:overflow-hidden mx-auto">
    </div>
  </div>
</main>
<footer class="w-full h-10 justify-center items-center bg-gray-900/80 bottom-0 absolute text-white text-center flex">
  <p class="justify-center text-sm">Dream Destination 2025</p>
</footer>

<style>
  @font-face {
    font-family: Roboto;
    src: url("/fonts/Roboto");
  }
</style>
