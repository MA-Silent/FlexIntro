import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react";

const queryClient = new QueryClient();

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Projects />
    </QueryClientProvider>
  )
}

function Projects() {
  const [data, setTest] = useState([])

  const { isPending, error } = useQuery({
    queryKey: ['projects'],
    queryFn: () =>
      fetch('http://localhost:3000/').then((res) =>
        res.json(),
      ).then((json)=>{setTest(json); return json}),
  })

  let from, to

  if (isPending) return "Loading..."
  if (error) return `An error occurred: ${error.message}`

  function handleDrop() {
        setTest((projects) => {
            const newProjects = [ ...projects ];
            [ newProjects[from], newProjects[to] ] = [ newProjects[to], newProjects[from] ];
            return newProjects;
        })
    }

  return (
    <div className="flex items-center justify-center h-full from-fuchsia-800 to-cyan-500 bg-linear-0">
      <div className="h-fit flex flex-row">
        <div className="flex flex-col justify-around mr-8">
          <img src="logo-livingshapes.png" alt="" className="h-52" />
          <div className="flex flex-col">
            <a href="#">Contact</a>
            <a href="#">Here</a>
            <a href="#">Please</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 grid-rows-1 w-fit">
          {(data as Array<Object>).map((project, index) => {
            return (
              <div className="bg-transparent w-80 h-fit flex flex-col text-amber-400" key={index} draggable onDragStart={() => { from = index }} onDragOver={(event) => { event.preventDefault(); to = index; }} onDrop={handleDrop}>
                <div>{project.title}</div>
                <img src={project.image_main} onMouseOver={e=>(e.currentTarget.src =project.image_second)} onMouseOut={e=>e.currentTarget.src = project.image_main} alt="an image" />
                <div>{project.city_location}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>

  )
}