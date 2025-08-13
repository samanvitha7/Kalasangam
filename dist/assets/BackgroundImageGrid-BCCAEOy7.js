import{r as l,j as e,h as S}from"./index-Cua5qR5f.js";const k=({src:i,alt:c,className:p,style:d,title:b,onLoad:u,onError:h})=>{const[y,w]=l.useState(!1),[f,g]=l.useState(!1),x=()=>{w(!0),u&&u()},j=()=>{g(!0),h&&h()};return e.jsxs("div",{className:`${p} image-item`,style:d,title:b,children:[!y&&!f&&e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-xl"}),f?e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center rounded-xl",children:e.jsx("div",{className:"text-gray-500 text-2xl",children:"🎨"})}):e.jsxs(e.Fragment,{children:[e.jsx("img",{src:i,alt:c,onLoad:x,onError:j,className:"absolute inset-0 w-full h-full object-cover rounded-xl",loading:"lazy",decoding:"async"}),!y&&e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-xl"})]})]})},C=()=>{const[i,c]=l.useState([]),[p,d]=l.useState(!0),[b,u]=l.useState(null),[h,y]=l.useState(.4),[w,f]=l.useState(new Set),g=[1,2,3],x=n=>new Promise((o,t)=>{const a=new Image;a.onload=()=>{f(r=>new Set([...r,n])),o(n)},a.onerror=t,a.src=n});if(l.useEffect(()=>{(async()=>{try{d(!0);const t=await S.get("https://kalasangam.onrender.com/api/artforms?limit=50");let a=[];t.data&&t.data.success&&Array.isArray(t.data.data)?a=t.data.data:Array.isArray(t.data)&&(a=t.data);const r=[];a.forEach(s=>{s.photoUrl&&Array.isArray(s.photoUrl)&&s.photoUrl.forEach(v=>{v&&v.trim()&&r.push({url:v.trim(),alt:`${s.name||"Traditional art"} from ${s.origin||"India"}`,artformName:s.name,origin:s.origin,rowSpan:g[Math.floor(Math.random()*g.length)]})})});const m=r.sort(()=>Math.random()-.5).slice(0,40);c(m);const I=m.slice(0,20);Promise.allSettled(I.map(s=>x(s.url))).then(()=>{console.log("First batch of images preloaded")})}catch(o){console.error("Error fetching artform images:",o),u(o.message),c([{url:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",alt:"Traditional art",rowSpan:2},{url:"https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop",alt:"Food art",rowSpan:1},{url:"https://images.unsplash.com/photo-1577308856961-8e0ec50d0c4b?w=300&h=500&fit=crop",alt:"Traditional craft",rowSpan:3}])}finally{d(!1)}})()},[]),p)return e.jsxs("div",{className:"absolute inset-0 w-full h-full overflow-hidden",children:[e.jsx("style",{children:`
            @keyframes moveUp {
              0% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
              100% { transform: translateY(0); }
            }
            
            @keyframes moveDown {
              0% { transform: translateY(0); }
              50% { transform: translateY(20px); }
              100% { transform: translateY(0); }
            }
            
            .animate-move-up {
              animation: moveUp 8s ease-in-out infinite;
            }
            
            .animate-move-down {
              animation: moveDown 8s ease-in-out infinite;
            }
            
            .animate-move-up-delayed {
              animation: moveUp 8s ease-in-out infinite;
              animation-delay: 2s;
            }
            
            .animate-move-down-delayed {
              animation: moveDown 8s ease-in-out infinite;
              animation-delay: 2s;
            }
            
            .animate-move-up-delayed-2 {
              animation: moveUp 8s ease-in-out infinite;
              animation-delay: 4s;
            }
          `}),e.jsxs("div",{className:"relative h-full",children:[e.jsx("div",{className:"grid grid-cols-5 gap-6 p-8 pt-20 h-full",children:Array.from({length:30},(n,o)=>{const t=o%5;let a="";switch(t){case 0:a="animate-move-up";break;case 1:a="animate-move-down";break;case 2:a="animate-move-up-delayed";break;case 3:a="animate-move-down-delayed";break;case 4:a="animate-move-up-delayed-2";break;default:a=""}return e.jsx("div",{className:`bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse ${a}`,style:{gridRowEnd:`span ${[1,2,3][o%3]}`}},o)})}),e.jsx("div",{"aria-hidden":"true",className:"absolute inset-0 pointer-events-none rounded-xl",style:{backgroundColor:`rgba(0,0,0,${h})`}})]})]});const N=(()=>{const n=[[],[],[],[],[]];return i.forEach((t,a)=>{n[a%5].push(t)}),n.forEach((t,a)=>{for(;t.length<12;){const r=i.length>0?i:[{url:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",alt:"Traditional art",rowSpan:2}],m=r[Math.floor(Math.random()*r.length)];t.push({...m,rowSpan:[1,2,3][Math.floor(Math.random()*3)]})}}),n})();return e.jsxs("div",{className:"absolute inset-0 w-full h-full overflow-hidden",children:[e.jsx("style",{children:`
          @keyframes scrollUpColumn {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }

          .column-container {
            overflow: hidden;
            position: relative;
            height: 100vh;
          }

          .column-scroll {
            animation: scrollUpColumn 60s linear infinite;
          }

          .column-scroll-delay-1 {
            animation: scrollUpColumn 65s linear infinite;
            animation-delay: -13s;
          }

          .column-scroll-delay-2 {
            animation: scrollUpColumn 70s linear infinite;
            animation-delay: -26s;
          }

          .column-scroll-delay-3 {
            animation: scrollUpColumn 58s linear infinite;
            animation-delay: -39s;
          }

          .column-scroll-delay-4 {
            animation: scrollUpColumn 63s linear infinite;
            animation-delay: -52s;
          }

          .image-item {
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            transition: all 0.3s ease;
          }

          .image-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%);
            pointer-events: none;
            z-index: 1;
          }

          .image-item:hover::before {
            background: linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.2) 100%);
          }
        `}),e.jsx("div",{className:"relative h-full",children:e.jsx("div",{className:"flex gap-6 p-8 pt-20 h-full",children:N.map((n,o)=>{const t=["column-scroll","column-scroll-delay-1","column-scroll-delay-2","column-scroll-delay-3","column-scroll-delay-4"][o],a=[...n,...n,...n,...n.slice(0,Math.ceil(n.length/2))];return e.jsx("div",{className:"flex-1 column-container",children:e.jsx("div",{className:`flex flex-col ${t}`,children:a.map((r,m)=>e.jsx(k,{src:r.url,alt:r.alt,title:`${r.artformName||"Traditional Art"} - ${r.origin||"India"}`,className:"relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer flex-shrink-0 mb-6",style:{height:`${(r.rowSpan||1)*160+(r.rowSpan-1)*24}px`}},`${o}-${m}`))})},o)})})}),i.length===0&&e.jsx("div",{className:"w-full h-full bg-gradient-to-br from-blush-peach/30 to-coral-pink/20 flex items-center justify-center",children:e.jsxs("div",{className:"text-center text-deep-teal/50",children:[e.jsx("div",{className:"text-4xl mb-2",children:"🎨"}),e.jsx("p",{className:"text-sm font-lora",children:"Loading beautiful art..."})]})})]})};export{C as B};
