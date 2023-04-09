const Articulo = require("../models/articulosModelo")




const getArticulos=async(req,res)=>{


const options={
    page:req.query.page,
    limit:2
}

  
    try {

        Articulo.paginate({}, options,(err,docs)=>{

           
            return  res.status(200).json({
                ok:true,
                msg:'Obteniendo todos articulos',
                data: docs,
                
            })
        })
    } catch (error) {
        return  res.status(404).json({
            ok:false,
            msg:'Error al ob '
        })
     } 
}


const getArticulo= async(req,res)=>{
       console.log('getArticulo');
    const id=req.params.id

    try {
        const unArticulo=await Articulo.findById(id) 

        if(!unArticulo){
            return res.status(404).json({
                ok:false,
                msg:'el id esta mal'
            })
        }else{
             return  res.status(200).json({
                ok:true,
                msg:'Obteniendo un articulo ',
                articuloEncontrado:unArticulo
        })
        }
       
    } catch (error) {
        return  res.status(500).json({
            ok:false,
            msg:'Error al obtener el servicio solicitado'
        })
    }
   
}


const crearArticulo = async (req, res) => {

    const nuevoArticulo = new Articulo(req.body);
    

    try {

        const articuloData=nuevoArticulo.save()
        if(!articuloData){
            return res.status(404)
        }else{
            return res.status(201).json({
            ok:true,
            msg:"articulo creado",
            data:articuloData
        })
        }
        
        

    } catch (error) {
       
        return res.status(500).json({
            ok: false,
            msg: 'ERROR: no se ha creado el articulo .'
        });

    } 
}


const actualizarArticulo= async(req,res)=>{

    try {  
        const id = req.params.id;
        const title = req.body.title;
        const extracto = req.body.extracto;
        const descripcion=req.body.descripcion
        const image=req.body.image
        const articuloActualizada = await Articulo.findOneAndUpdate({_id:id},{$set:{title,image,descripcion,extracto}},{new:true});
            return res.status(201).json({
                ok:true,
                msg:"actualizando articulo",
                data:articuloActualizada
            })
        
    } catch (error) {
        
        return res.status(500).json({
            ok: false,
            msg: 'ERROR: no se ha encontrado el articulo que quiere actualizar.'
        });

    };
}


const eliminarArticulo= async(req,res)=>{

    const id=req.params.id

   try {

        await Articulo.findOneAndDelete({_id:id});

        return res.status(200).json({
            ok: true,
            msg: 'articulo eliminado correctamente.'
        });
        
    } catch (error) {
        
        return res.status(500).json({
            ok: false,
            msg: 'ERROR: el articulo  que quiere eliminar no existe.'
        });

    }
}


const getArticuloBusqueda= async(req,res)=>{
   
   
    
    const busqueda= new RegExp( `${req.query.query}`,'i' ) 
    
    
    try {
       
       
        const articulos=await Articulo.find(

            {$or:[{title:busqueda},{extracto:busqueda}] }
        ) 

       

        if(!articulos){
            return res.status(404).json({
                ok:false,
                msg:' no hay ningun articulo con esa busqueda '
            })
        }else{
             return  res.status(200).json({
                ok:true,
                msg:'obteniendo las noticias ',
                articulos:articulos
        })
        }
    } catch (error) {
        return  res.status(500).json({
            ok:false,
            msg:'Error algo esta mal'
        })
    }
}



module.exports={
    getArticulos,
    getArticulo,
    crearArticulo,
    actualizarArticulo,
    eliminarArticulo,
    getArticuloBusqueda
}