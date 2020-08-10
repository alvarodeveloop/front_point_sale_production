import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment-timezone'
import transformImage from './transformImage'


pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default (config,configStore,sale) => {

	return new Promise((resolved,rejected) => {

		let promises = []
		let bodyTable = []

			var docDefinition = {
				content: [
					{
						columns:[
							{text: configStore.name_store, alignment: 'center'},
						]
					},
					{
						columns:[
							{text: configStore.address, alignment: 'center'},
						]

					},
					{
						columns:[
							{text: configStore.phone, alignment: 'center'},
						]
					},
					{
						style:'containerDiv',
						columns:[
							{
								text: 'pruebaaaaa'
							}
						]
					}
				],
				styles: {
					marginContext:{
						margin: [0,0,0,20],
					},
					containerDiv:{
						border: '1px solid black',
						width: '40%'
					},
					tableExample: {
						margin: [-10, 0, 0, 0]
					},
					tableHeader: {
						bold: true,
						fontSize: 13,
						color: 'black'
					},
				}
			};
			var pdf = pdfMake.createPdf(docDefinition);
			if(pdf.download('Factura.pdf')){
				resolved(true)
			}else{

				resolved(true)
			}


		})
}
