<template>

<!-- фиксация: 14/08/22 14:00 
Рефакторинг (сегодня сложно для осознания всех правок)

-->

  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
  <div class=" w-100 h-100 opacity-80 bg-purple-800 inset-0 z-50 flex 
  items-center justify-center">
    <!-- <svg class="animate-spin -ml-1 mr-3 h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg> -->
  </div>
  <div class="container">
    <section>
    
      <div class="flex">
        <div class="max-w-xs">
          <label for="wallet" class="block text-sm font-medium text-gray-700"
            >Тикер</label> 
          <div class="mt-1 relative rounded-md shadow-md">
          
            <input
              v-model="ticker"
              @keydown.enter="add"
              type="text"
              name="wallet"
              id="wallet"
              class="block w-full pr-10 border-gray-300 text-gray-900 
              focus:outline-none 
              focus:ring-gray-500 
              focus:border-gray-500 sm:text-sm rounded-md"
              placeholder="Например DOGE"
            />
          </div>
          <div class="flex bg-white shadow-md p-1 rounded-md flex-wrap">
            <span class="inline-flex items-center px-2 m-1 rounded-md text-xs 
            font-medium bg-gray-300 text-gray-800 cursor-pointer">
              BTC
            </span>
            <span class="inline-flex items-center px-2 m-1 rounded-md text-xs 
            ont-medium bg-gray-300 text-gray-800 cursor-pointer">
              DOGE
            </span>
            <span class="inline-flex items-center px-2 m-1 rounded-md text-xs 
            font-medium bg-gray-300 text-gray-800 cursor-pointer">
              ETH
            </span>
            <span class="inline-flex items-center px-2 m-1 rounded-md text-xs 
            font-medium bg-gray-300 text-gray-800 cursor-pointer">
              LUNA
            </span>
          </div>
          <div class="text-sm text-red-600">Такой тикер уже добавлен</div>
        </div>
      </div>
      <button
        @click="add()"
        type="button"
        class="my-4 inline-flex items-center py-2 px-4 border border-transparent 
        shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 
        hover:bg-gray-700 transition-colors duration-300 focus:outline-none 
        focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <!-- Heroicon name: solid/mail -->
        <svg
          class="-ml-0.5 mr-2 h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="#ffffff"
        >
          <path
            d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
          ></path>
        </svg>
        Добавить  
      </button>
    </section>

      <hr class="w-full border-t border-gray-600 my-4" />
        <div>
          <button 
          class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent 
              shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 
              hover:bg-gray-700 transition-colors duration-300 focus:outline-none 
              focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          v-if="page > 1"
          @click="page-=1"
          >Назад</button>
 
          <button
          class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent 
              shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 
              hover:bg-gray-700 transition-colors duration-300 focus:outline-none 
              focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          v-if="hasNextPage"
          @click="page+=1"
          >Вперед</button> 

          <div>Фильтр: 
            <input v-model="filter"/> 
          </div>
 
        </div>

      <hr class="w-full border-t border-gray-600 my-4" />

            <!-- Тест клика на ПЛАШКУ:{{selectedTicker}} -->
      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">

    <div
      v-for="(tick,index) in paginatedTickers" 
      :key="index"
      @click="select(tick)"

      :class="{'border-4': selectedTicker===tick}"

      class="bg-white overflow-hidden shadow rounded-lg 
      border-purple-800 border-solid cursor-pointer  "
    >
      <div class="px-4 py-5 sm:p-6 text-center">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Индекс: {{index}} // {{tick.name}}  - USD    
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{tick.price}}
        </dd>
      </div>
      <div class="w-full border-t border-gray-200"></div>
      <button
        @click.stop="handleDelete(tick, index)"
        class="flex items-center justify-center font-medium 
        w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500
        hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all 
        focus:outline-none"
      >
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#718096"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path></svg>Удалить
      </button>
    </div>
       
      </dl>
      <hr 
      v-if="tickers.length>0"
      class="w-full border-t border-gray-600 my-4" />

    <section v-if="selectedTicker" class="relative">
      <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">
        {{selectedTicker.name}} - USD
      </h3>
      <div class="flex items-end border-gray-600 border-b border-l h-64">
        <div 
        v-for="(bar, index) in normalizedGraph"
        :key="index"
        :style="{height: `${bar}%`}"  
        class="bg-purple-700 border w-10 " ></div>
 
      </div>

      <button type="button"
      @click="selectedTicker=null"
      class="absolute top-0 right-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.com/svgjs"
          version="1.1"
          width="30"
          height="30"
          x="0"
          y="0"
          viewBox="0 0 511.76 511.76"
          style="enable-background:new 0 0 512 512"
          xml:space="preserve"
        >
          <g>
            <path
              d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z"
              fill="#718096"
              data-original="#000000"
            ></path>
          </g>
        </svg>
      </button>
    </section>
  </div>
</div>
</template>

<script>
 
  
export default {
  name: 'App',

  data() {
    return {
      ticker:'BTC', //поле ввода "Тикер"
      filter:"",  //поле ввода "Фильтр"

      tickers:[], //массив валют с Сервера
      selectedTicker: null,  //текущая валюта 

      graph:[], // график цены выбранной Крипты

      page: 1, // страница (ориентир )
     // hasNextPage:true, //флаг для продолжения пагинации

    };

  },

   created() {
  //грузим данные из url (в адресной строке пишет  localhost:8080/?filter=&page=1)
   const windowData = Object.fromEntries(
   new URL(window.location).searchParams.entries()
   );

//замена if(windowData.filter){...} ниже-но пока не ясно
  //  const VALID_KEYS = ["filter" , "page"];
  //  VALID_KEYS.forEach(key =>{
  //   if (windowData[key]){
  //     this[key = windowData[key];
  //   }
  //  });
   

   if(windowData.filter){
    this.filter = windowData.filter;
   }
      if(windowData.page){
    this.page = windowData.page;
   }


//грузит данные из localStorage (в котором сохраняются данные о выбранных валютах)

   const tickersData = localStorage.getItem("crypto-list");
   if (tickersData !==null){
      this.tickers = JSON.parse(tickersData); 

      this.tickers.forEach((ticker)=>{ 
        this.subscribeToUpdates(ticker.name)
      })
   }
     
  },

  computed:{
//подготовка для постраничной нарезки через slice(start, end) (для пагинации )
  startIndex(){
    return(this.page - 1) *6;
  },
  endIndex(){
    return this.page * 6;
  },

 //работа Фильтра: вывод всех валют, которые попали под условие фильтрации 
  filteredTickers(){
   return this.tickers.filter( ticker=>
   ticker.name.includes(this.filter) 
   );
  },

  // нарезка по страницам (для перелистывания по 6 страниц)
  paginatedTickers(){
      return this.filteredTickers.slice(this.startIndex, this.endIndex);
  },

// для появления кнопки "Вперед" (проверка наличия следующих элементов)
  hasNextPage(){
   return this.filteredTickers.length > this.endIndex;
  },

      
//логика , что бы График показывал динамику цены выбранной валюты корректно
  normalizedGraph(){
    const maxValue=Math.max(...this.graph);
    const minValue=Math.min(...this.graph);

    //если все графы равны, то вывод на экран одинаковые линии
    if(maxValue ===minValue){
      return this.graph.map(()=> 50);
    }

    return this.graph.map(
      price=>5+((price-minValue)*95/(maxValue-minValue))
    );
  },

    pageStateOptions(){
      return{
        filter:this.filter,
        page: this.page,
      }
    },


  
  },// computed::end




  methods: {



//обновление Валют с Сервера 
  subscribeToUpdates(tickerName){
        setInterval(async()=>{
        const f = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${tickerName}&tsyms=USD&api_key=a039243189c235cf1c0939e6e44a049ac7407df5e2f7ea9f7c3929a1156e3199`
        );
        const data = await f.json();
        console.log (data);

        this.tickers.find(t=> t.name===tickerName).price = data.USD;

        if(this.selectedTicker?.name === tickerName){
          this.graph.push(data.USD)
        }
        
      },8000);

      this.ticker=''   
  }, //subscribeToUpdates::end

//логика кнопки "Добавить"
    add(){
        
      let currentTicker = 
      {
      name:this.ticker , 
      price: "-0"
      }
      
      console.log (currentTicker)

      //this.tickers.push(currentTicker);
      this.tickers = [...this.tickers, currentTicker];

      this.filter="";

     // localStorage.setItem("crypto-list", JSON.stringify(this.tickers));
      this.subscribeToUpdates(currentTicker.name);

    }, // add():: end

 //логика клика выбора для появления в Графике   
      select(tick){
        this.selectedTicker = tick;

      },

// логика кнопки "удалить" Валюту из выбранных
      handleDelete(tick, index){
      console.log (tick, index)

      this.tickers = this.tickers.filter(t => t !==tick);
      // this.selectedTicker = null;
      
      //Удалю ПлашкуВалюты=>Исчезнет включенный График
      if(this.selectedTicker === tick){
        this.selectedTicker = null;
        }
      },
      

    },

    watch:{
  //когда меняется выбор ПлашкиВалюты -> График обнулить
  selectedTicker(){
      this.graph = [];
  },

//Когд меняется массив Валют, то его пересохранить в localStorage
  tickers(newValue, oldValue){
    localStorage.setItem("crypto-list", JSON.stringify(this.tickers));
  },

  //Если удалил последнюю Плашку на стр№3, то перекинет на стр№2 (Где есть Плашки) и т.д.
    paginatedTickers(){
      if(this.paginatedTickers.length ===0 && this.page > 1){
          this.page -=1;
        }
    },

    //Следит, если изменился Фильтр, то меняет запись url вадресной строке
    //в связке с pageStateOptions из computed
      filter(){
        this.page = 1;
      },

    //Следит, если изменилась Страница, то меняет запись url вадресной строке
    //в связке с pageStateOptions из computed
      pageStateOptions(value){
          window.history.pushState(
          null,
          document.title,
          `${window.location.pathname}?filter=${value.filter}&page=${value.page}`
          );
      }

     }//watch:: end

     //  


 
}
</script>

<style src="./app.css"></style>
