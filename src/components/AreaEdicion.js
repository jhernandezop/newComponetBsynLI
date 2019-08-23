import React, { Component } from 'react';
import {Form} from 'react-formio';
import './AreaEdicion.css';
import moment from 'moment';
/*
import { prueba } from './formularios/Prueba.json';
import { agendamiento } from './formularios/Tipificacion_Agendamiento.json';
import { seguimiento } from './formularios/Tipificacion_casos_en_seguimiento.json';

*/

import form_aereo from './formularios/form_aereo.json'
import form_maritimo from './formularios/form_maritimo.json'
import form_trucking from './formularios/form_trucking.json'
import tipifica_finaliza_gestion from './formularios/tipifica_finaliza_gestion.json'
//import tipifica_gestion from './formularios/tipifica_gestion.json'


class AreaEdicion extends Component {

  constructor(props) {
    super(props);
    this.state = {  
       ficha_S2_id:"",
       ficha_C_T_id:"",
       ficha_nro_gestion:"",
       ficha_estado:"",
       ficha_canal:"",
       expandida: false,
       formulario:"",
       detalleLLamada:""

     }

     this.ocultarfomrulario=this.ocultarfomrulario.bind(this)
     this.mostrarfomrulario=this.mostrarfomrulario.bind(this)
     
     
  }

  actualizarformularios(nuevoFormulario){
    
    console.log(nuevoFormulario.formulario[0])
      this.setState({caso_ES:nuevoFormulario.formulario[0].caso_ES});
      //ACTUALIZO ESTADO DEL AREA DE EDICION
       this.setState({ficha_S2_id:nuevoFormulario.formulario[0].ficha.caso_ES});
       this.setState({ficha_C_T_id:nuevoFormulario.formulario[0].ficha.caso_CAM});
       this.setState({ficha_nro_gestion:nuevoFormulario.formulario[0].ficha.nro_gestion});
       if(nuevoFormulario.formulario[0].ficha.estado_proceso=="nuevo"){
            this.setState({ficha_estado:"nuevo"});
        }else if(nuevoFormulario.formulario[0].ficha.estado_proceso=="en gestion"){
            this.setState({ficha_estado:"en_gestion"});
        }else if(nuevoFormulario.formulario[0].ficha.estado_proceso=="agendado"){
            this.setState({ficha_estado:"agendado"});
        }

       
      //ACTUALIZO CANAL
      this.setState({ficha_canal:nuevoFormulario.formulario[0].ficha.canal});
      //EXTRAIGO LOS EJECUTIVOS
      const ejecutivos = [];
      const los_ejecitivos=this.props.ejecutivos
      //console.log(los_ejecitivos)
      los_ejecitivos.forEach(function(element) {
        
        ejecutivos.push({
                                    "label": element.ConsultorVentas,
                                    "value": element.RUT
        })  

      }); 
      //DETERMINO LA CONSTANTE FORMULARIO
      const f=nuevoFormulario.formulario[0].datosFormulario
     // this.setState({formulario:""});
     // this.setState({formulario:"detalleLLamada"});
      console.log(nuevoFormulario.formulario[0].ficha.canal)
      if(nuevoFormulario.formulario[0].ficha.canal=="web") {
        
        this.state.formulario="detalleLLamada";
        const newForm=form_aereo 
        //PESTAÑA INFO CLIENTE = detalleLLamada.components[0].components[0]
        newForm.components[0].components[0].components[0].columns[0].components[0].defaultValue=f.doc_nu_documento
        newForm.components[0].components[0].components[0].columns[0].components[1].defaultValue=f.doc_nombre
        newForm.components[0].components[0].components[0].columns[0].components[2].defaultValue=f.doc_Ap_paterno
        newForm.components[0].components[0].components[0].columns[0].components[3].defaultValue=f.doc_nu_telefono

        newForm.components[0].components[0].components[0].columns[1].components[0].defaultValue=f.doc_nucotizacion
        newForm.components[0].components[0].components[0].columns[1].components[1].defaultValue=f.doc_version
        newForm.components[0].components[0].components[0].columns[1].components[2].defaultValue=f.doc_lugaratencion

        newForm.components[0].components[0].components[1].columns[0].components[0].defaultValue=f.doc_no_correo
        newForm.components[0].components[0].components[1].columns[1].components[0].defaultValue=f.doc_Comuna
        newForm.components[0].components[0].components[1].columns[2].components[0].defaultValue=f.doc_no_direccion
        //PESTAÑA INFORMACION COMPLEMENTARIA = newForm.components[0].components[1] 
        //VEHICULO EN PARTE DE PAGO
        newForm.components[0].components[1].components[0].components[0].columns[0].components[0].defaultValue=f.doc_Retoma_no_patente
        newForm.components[0].components[1].components[0].components[0].columns[0].components[1].defaultValue=f.doc_Retoma_no_version
        newForm.components[0].components[1].components[0].components[0].columns[1].components[0].defaultValue=f.doc_Retoma_no_modelo
        newForm.components[0].components[1].components[0].components[0].columns[1].components[1].defaultValue=f.doc_Retoma_nu_anio
        newForm.components[0].components[1].components[0].components[0].columns[2].components[0].defaultValue=f.doc_Retoma_no_marca
        newForm.components[0].components[1].components[0].components[0].columns[2].components[1].defaultValue=f.doc_Retoma_ValorRetoma
        //CREDITO
        newForm.components[0].components[1].components[1].components[0].columns[0].components[0].defaultValue=f.doc_Credito_Tipo
        newForm.components[0].components[1].components[1].components[0].columns[0].components[1].defaultValue=f.doc_Credito_TotalaFinanciar
        newForm.components[0].components[1].components[1].components[0].columns[0].components[2].defaultValue=f.doc_Credito_Saldo
        newForm.components[0].components[1].components[1].components[0].columns[1].components[0].defaultValue=f.doc_Credito_MontoPie
        newForm.components[0].components[1].components[1].components[0].columns[1].components[1].defaultValue=f.doc_Credito_ValorCuota
        newForm.components[0].components[1].components[1].components[0].columns[1].components[2].defaultValue=f.doc_Credito_CAE
        newForm.components[0].components[1].components[1].components[0].columns[2].components[0].defaultValue=f.doc_Credito_Cuotas
        newForm.components[0].components[1].components[1].components[0].columns[2].components[1].defaultValue=f.doc_Credito_CostoTotal
        //SEURO
        newForm.components[0].components[1].components[2].components[0].columns[0].components[0].defaultValue=f.doc_Seguro_Deducible
        newForm.components[0].components[1].components[2].components[0].columns[1].components[0].defaultValue=f.doc_Seguro_PrimaAnual
        newForm.components[0].components[1].components[2].components[0].columns[2].components[0].defaultValue=f.doc_Seguro_PrimaMensual
        //PESTAÑA HISTORICO = detalleLLamada.components[0].components[2] 
        //VEHICULO EN PARTE DE PAGO
        /*detalleLLamada.components[0].components[2].components[0].components[0].columns[0].components[0].defaultValue=f.nucotizacion
        detalleLLamada.components[0].components[2].components[0].components[0].columns[0].components[1].defaultValue=f.Retoma_no_version
        detalleLLamada.components[0].components[2].components[0].components[0].columns[1].components[0].defaultValue=f.Retoma_no_modelo
        detalleLLamada.components[0].components[2].components[0].components[0].columns[1].components[1].defaultValue=f.Retoma_nu_anio
        detalleLLamada.components[0].components[2].components[0].components[0].columns[2].components[0].defaultValue=f.Retoma_no_marca
        detalleLLamada.components[0].components[2].components[0].components[0].columns[2].components[1].defaultValue=f.Retoma_ValorRetoma*/
        

        //RESULTADO DE LA LLAMADA
        //seguimiento.components[0].components[2].columns[0].components[0].data.values=ejecutivos
        //console.log(seguimiento.components[0].components[2].columns[0].components[0].data.values)
        
        this.state.detalleLLamada=newForm
      
      }else if(nuevoFormulario.formulario[0].ficha.canal=="telefonia"){
        this.state.formulario="detalletelefonia";
        const newForm=form_aereo 
        //PESTAÑA INFO CLIENTE = detalleLLamada.components[0].components[0]
        newForm.components[0].components[0].components[1].defaultValue=f.doc_nombre

      }



      console.log(this.state)
      this.mostrarfomrulario()
      console.log(this.state)

      //this.setState({expandida:true});


  }


  componentWillReceiveProps(nextProps){
  
    console.log(nextProps)
     this.ocultarfomrulario()
     
     
    //console.log(nextProps.formulario.length)
    if(nextProps.formulario.length>0){
      
      this.actualizarformularios(nextProps); 

    }
    

    
    
  }

  verFomrularioTipificacion(text) {
    console.log(this.state.ficha_estado)
    if(text=="tipificacion"){
        if(this.state.ficha_estado=="nuevo" || this.state.ficha_estado=="en gestion" || this.state.ficha_estado=="en_gestion"){
            this.setState({formulario:"seguimiento"});
        }else if(this.state.ficha_estado=="agendado"){
            this.setState({formulario:"tipificacion"});

        }
    }else if(text=="detalleLLamada"){
        if(this.state.ficha_canal=="web") {
            this.setState({formulario:"detalleLLamada"});
        }else if(this.state.ficha_canal=="telefonia"){
            this.setState({formulario:"detalletelefonia"});
        }
        
    }
  }

  

  enviargestion = (event) => {

    document.getElementById("submit").setAttribute("disabled","disabled");

    console.log(event)

     //const fecha_seguimiento="";
     //const fechas_seguimiento="";
    if(event.data.select=="agendamiento_tercero"){



        console.log(event.data.fechaDeAgendamiento)
        const los_ejecitivos=this.props.ejecutivos 
        const datos_ejecutivo = []
        los_ejecitivos.forEach(function(element) {
            if(element.RUT==event.data.ejecutivoDePiso){
                //console.log(rut, element.Sucursal) 
                datos_ejecutivo.push(element.Sucursal, element.COMUNA, element.CIUDAD)
                
            }
        })
       
        console.log(datos_ejecutivo)
        //const fechas_seguimiento=event.data.fechaDeAgendamiento
        //const fechas_seguimiento=fecha_seguimiento.split("T",2)
        this.props.formulario[0].datosFormulario["fecha_seguimiento"]=""
        this.props.formulario[0].datosFormulario["hora_seguimiento"]=""
        this.props.formulario[0].datosFormulario["tipo_seguimiento"]=""
        this.props.formulario[0].datosFormulario["comentario_piso"]=event.data.comentarioAEjecutivo
        this.props.formulario[0].datosFormulario["comentario_gestion"]=event.data.comentarios
        this.props.formulario[0].datosFormulario["sucursal_agenda"]=datos_ejecutivo[0]
        this.props.formulario[0].datosFormulario["ciudad_agenda"]=datos_ejecutivo[2]
        this.props.formulario[0].datosFormulario["comuna_agenda"]=datos_ejecutivo[1]
        this.props.formulario[0].datosFormulario["fecha_agenda"]=event.data.fechaDeAgendamiento.slice(0, 10)
        this.props.formulario[0].datosFormulario["hora_agenda"]=event.data.fechaDeAgendamiento.slice(11, 18)
        this.props.formulario[0].datosFormulario["rut_asesor_comercial"]=event.data.ejecutivoDePiso
        this.props.formulario[0].datosFormulario["puntodeventa"]=event.data.ejecutivoDePiso
    }else{

        /*this.props.formulario[0].datosFormulario["fecha_seguimiento"]=""
        this.props.formulario[0].datosFormulario["hora_seguimiento"]=""
        this.props.formulario[0].datosFormulario["tipo_seguimiento"]=""
        this.props.formulario[0].datosFormulario["comentario_piso"]=""
        this.props.formulario[0].datosFormulario["comentario_gestion"]=""
        this.props.formulario[0].datosFormulario["sucursal_agenda"]=""
        this.props.formulario[0].datosFormulario["ciudad_agenda"]=""
        this.props.formulario[0].datosFormulario["comuna_agenda"]=""
        this.props.formulario[0].datosFormulario["fecha_agenda"]=""
        this.props.formulario[0].datosFormulario["hora_agenda"]=""
        this.props.formulario[0].datosFormulario["rut_asesor_comercial"]=""
        this.props.formulario[0].datosFormulario["puntodeventa"]=""*/

    }
       
    this.props.formulario[0].datosFormulario["comentario_sv"]=event.data.comentarios
    this.props.formulario[0].datosFormulario["resultado_llamada"]=event.data.select

    const transaccion={
                        "tx":"gesSV",
                        "ts_o":moment().format('YYYY-MM-DDTHH:mm:ss'),
                        "tx_user":this.props.anexo,
                        "destino":"test",
                        "tx_version" : "0.3",
                        "origen":"face",
                        "caso": {
                            "nro_gestion": this.state.ficha_nro_gestion,
                            "S2_id":this.state.ficha_S2_id,
                            "resultado_llamada": event.data.select,
                            "casoCAM":this.state.ficha_C_T_id,
                            "user":this.props.anexo,
                            "tipo":"",
                            "padre":"0",
                            "campania":"",
                            "estado":this.state.ficha_estado,
                            "comentario_sv":event.data.comentarios,
                        },
                        "gestion":{},
                        "gestion_data":this.props.formulario[0].datosFormulario
                        }

                    console.log(transaccion)

          var url = 'https://bscore.openpartner.cl/gdm';
         
            fetch(url, {
              method: 'POST', 
              body: JSON.stringify(transaccion), 
              headers:{
              'Content-Type': 'text/plain'
              }
            })
            .then(res => res.json())
            .then(response => {if(response){
                            console.log(response);
                             this.props.pedirFichas()
                             this.props.desplegarEdicion("limpiar","","")
                              this.setState({expandida:false});

                            }})
            .catch(error => console.error('Error:', error));
        

    
  }

  actualizar = (event) => {

    console.log(this.state)
    console.log(event.data)
    const actualizar=event.data
    this.setState({expandida:false});
    

  }
 
ocultarfomrulario() {

    this.setState({expandida:false});
    
}

mostrarfomrulario() {
    
    this.setState({expandida:true});
}

actualizarGestionData(event){

  const campos_nuevos= event.data

  for (const i in campos_nuevos) {
        //console.log(i)
        //console.log(campos_nuevos[i])
        this.props.formulario[0].datosFormulario[i]=campos_nuevos[i]

  }

  console.log(event.data)
  console.log(this.props.formulario[0].datosFormulario)
}
 
/*<div key={key} className="form-group">
          <label for={"exampleInputEmail1"+key}>{key}</label>
          <input type={key} value={formulario[key]} className="form-control" id={"Input"+key} aria-describedby={key} placeholder={"Enter"+key} />
        </div>*/
  render(){

    //const detalle = <Form form={this.state.detalleLLamada} onSubmit={this.actualizar} />
     

/*{formulario}*/
    if(this.state.expandida==true ){

           
       
            return (

              <div id="contenedorFormularios"  className='row contenedorFormularios'>
                
                {this.state.formulario=="detalleLLamada" && <Form form={form_aereo} onChange={(schema) => this.actualizarGestionData(schema)} onSubmit={this.actualizar} />}
                {this.state.formulario=="detalletelefonia" && <Form form={form_aereo} onChange={(schema) => this.actualizarGestionData(schema)}  />}
                
                {this.state.formulario=="seguimiento" && <Form form={form_aereo} onSubmit={this.enviargestion} />}
                {this.state.formulario=="tipificacion" && <Form form={form_aereo} onSubmit={this.enviargestion} />}

                <div className="btn-group"  role="group" aria-label="Basic example">
                  <button type="button" onClick={() => this.verFomrularioTipificacion("detalleLLamada")} className="btn btn-secondary">Detalle</button>
                  <button type="button" onClick={() => this.verFomrularioTipificacion("tipificacion")} className="btn btn-secondary">Tipificar</button>
                  
                  
                  
                </div>
                
                
              </div> 
             
          ); 
        
    }else{
      return ( 
          <div className='row contenedorFormularios'></div> 
         
      ); 
    }
      
  }
}



export default AreaEdicion;

