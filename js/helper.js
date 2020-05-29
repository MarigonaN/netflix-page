let url = "https://striveschool.herokuapp.com/api/movies/"


const getMovies= async (genre) => {
    let response = await fetch(url+genre,  {
        "method": "GET",
        "headers": {
            "Authorization": "Basic " + btoa('user19:Hxx8R4wZfCANamrj')}
        })
    try {
        if(response.ok) {
          
             let data = await response.json()
             
            return data          
        }
    }catch(error) {
        return error;
    }
    
}


const saveMovie = async (agendaEvent) => {
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(agendaEvent),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa('user19:Hxx8R4wZfCANamrj')
        
      }),
      
    });
    return response;
    

    
  };

  const deleteMovie =async (id) => {
     
    try {
       let response = await fetch(url + id, {
           method: "DELETE",
           "headers": {
               "Authorization": "Basic " + btoa('user19:Hxx8R4wZfCANamrj')},
         
       });
       if(response.ok) {
        alert('You have successfully deleted the movie')
        window.location.href = "movies.html?id=" + id;
    }
 }catch (error) {
     alert ('you can not delete the movie')
 }

}

  const handleSubmit = async() => {
    event.preventDefault();
    submitMovie();
  }


 const submitMovie = async() => {
     let titleInput = document.querySelector('#title')
     let descInput = document.querySelector('#description')
     let imgInput = document.querySelector('#imgUrl')
    
     let genreInput = document.querySelector('#genre')

     let obj = {
        name:titleInput.value,
        description:descInput.value,
        category: genreInput.value,
        imageUrl: [imgInput.value].join(', ')
     }
     console.log(obj)
    
        let response = await saveMovie(obj)
    
        let resp = await response.json()
        console.log(resp)

 }
 

 const displayList= async() => {
   
     let tableBody = document.querySelector('.movie-list tbody')
     let selector =  document.getElementById("filter-by-genres");
     tableBody.innerHTML = ''
     let data
     try {
        data = await getMovies('comedy')
        data.forEach(movie => {
            console.log(_.words(movie.imageUrl, ))
            tableBody.innerHTML+=createRow(movie)
        });
        selector.addEventListener('change', async function(event) {
            if(event.target.value==="drama") { 
                tableBody.innerHTML = ''
                data = await getMovies('drama')
                data.forEach(movie => {
                    console.log(_.words(movie.imageUrl, ))
                    tableBody.innerHTML+=createRow(movie)
                });
            }else if (event.target.value==="comedy") {
                tableBody.innerHTML = ''
                data = await getMovies('comedy')
                data.forEach(movie => {
                    console.log(_.words(movie.imageUrl, ))
                    tableBody.innerHTML+=createRow(movie)
                });
            } else if (event.target.value==="horror") {
                tableBody.innerHTML = ''
                data = await getMovies('horror')
                data.forEach(movie => {
                    console.log(_.words(movie.imageUrl, ))
                    tableBody.innerHTML+=createRow(movie)
                });
             } 
        
        
        }) 
       
        console.log(data)  
     } catch(e) {

     }
 }


 const createRow =(movieInfo)=> {
    let row=`
    <tr>
      <th scope="row">${movieInfo._id}</th>
      <td>${movieInfo.name}</a></td>
      <td>${movieInfo.description}</td>
      <td>${movieInfo.category}</td>
   
     
      <td><a type="button"  class="btn btn-info">Update</a></td>
      <td><button type="button" onclick="deleteMovie('${movieInfo._id}')" class="btn btn-danger">Delete</button></td>
    </tr>
    `
    return row;
  }
 