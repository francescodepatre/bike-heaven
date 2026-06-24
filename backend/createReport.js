/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email: francesco.depatre@studenti.unipr.it
*/

const fs = require('fs/promises')
const path = require('path')
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib')

const getSales = require('./getTotalSales')
const getBikes = require('./getTotalBikes')
const getAccessories = require('./getTotalAccessories')
const getServices = require('./getTotalServices')
const getEmployees = require('./getTotalEmployees')

async function createReport() {
    try {
        const [
            sales,
            bikes,
            accessories,
            services,
            employees
        ] = await Promise.all([
            getSales(),
            getBikes(),
            getAccessories(),
            getServices(),
            getEmployees()
        ])

        const totalSales = sales?.data ?? 0

        const bikeNum = bikes?.bikeNum ?? 0
        const bikeValue = bikes?.bikeValue ?? 0

        const accNum = accessories?.accNum ?? 0
        const accValue = accessories?.accValue ?? 0

        const serNum = services?.serNum ?? 0
        const serValue = services?.serValue ?? 0

        const empNum = employees?.emp ?? 0

        const pdfDoc = await PDFDocument.create()

        const page = pdfDoc.addPage([595, 842]) // A4
        const { width, height } = page.getSize()

        const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

        // Header
        page.drawText('BikeHeaven', {
            x: 50,
            y: height - 60,
            size: 22,
            font: boldFont,
            color: rgb(0, 0.35, 0.7)
        })

        page.drawText(
            'Via Borgo Rodolfo Tanzi 30/1, 43125 Parma (PR), Italy',
            {
                x: 50,
                y: height - 85,
                size: 10,
                font
            }
        )

        page.drawLine({
            start: { x: 50, y: height - 100 },
            end: { x: width - 50, y: height - 100 },
            thickness: 1
        })

        const currentDate = new Date()

        const reportDate = currentDate.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })

        page.drawText('MONTHLY BUSINESS REPORT', {
            x: 50,
            y: height - 140,
            size: 18,
            font: boldFont
        })

        page.drawText(`Generated on: ${reportDate}`, {
            x: 50,
            y: height - 165,
            size: 10,
            font
        })

        let y = height - 220

        const drawRow = (label, value) => {
            page.drawText(label, {
                x: 60,
                y,
                size: 12,
                font
            })

            page.drawText(String(value), {
                x: 350,
                y,
                size: 12,
                font: boldFont
            })

            y -= 28
        }

        drawRow('Total Sales', `€ ${totalSales}`)
        drawRow('Number of Bicycles', bikeNum)
        drawRow('Inventory Value (Bicycles)', `€ ${bikeValue}`)
        drawRow('Number of Accessories', accNum)
        drawRow('Inventory Value (Accessories)', `€ ${accValue}`)
        drawRow('Services Offered', serNum)
        drawRow('Services Value', `€ ${serValue}`)
        drawRow('Employees', empNum)

        const totalInventoryValue =
            Number(bikeValue) +
            Number(accValue) +
            Number(serValue)

        y -= 20

        page.drawLine({
            start: { x: 50, y },
            end: { x: width - 50, y },
            thickness: 1
        })

        y -= 35

        page.drawText(
            `Total Business Value: € ${totalInventoryValue}`,
            {
                x: 60,
                y,
                size: 14,
                font: boldFont,
                color: rgb(0, 0.4, 0)
            }
        )

        const pdfBytes = await pdfDoc.save()

        const fileName = `MonthlyReport-${
            currentDate.getFullYear()
        }-${
            String(currentDate.getMonth() + 1).padStart(2, '0')
        }.pdf`

        const filePath = path.join(__dirname, fileName)

        await fs.writeFile(filePath, pdfBytes)

        return {
            success: true,
            fileName,
            filePath
        }

    } catch (err) {
        console.error('createReport error:', err)

        return {
            success: false,
            error: err.message
        }
    }
}

module.exports = createReport