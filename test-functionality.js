// Test script to verify Angular vs HTML functionality
console.log('=== TESTING CERTIFICATE WIZARD FUNCTIONALITY ===\n');

// Test 1: Check if Angular app is accessible
console.log('1. Testing Angular app accessibility...');
fetch('http://localhost:4200')
    .then(response => {
        console.log('✅ Angular app is accessible');
        return response.text();
    })
    .then(html => {
        console.log('✅ HTML content loaded successfully');
        
        // Test 2: Check for key components
        console.log('\n2. Testing component presence...');
        const hasWizard = html.includes('app-wizard');
        const hasStepDatos = html.includes('app-step-datos');
        const hasStepPreview = html.includes('app-step-preview');
        
        console.log(`Wizard component: ${hasWizard ? '✅' : '❌'}`);
        console.log(`Step Datos component: ${hasStepDatos ? '✅' : '❌'}`);
        console.log(`Step Preview component: ${hasStepPreview ? '✅' : '❌'}`);
        
        // Test 3: Check for step indicators
        console.log('\n3. Testing step indicators...');
        const hasStepsIndicator = html.includes('steps-indicator');
        const hasStepLabels = html.includes('step-label');
        const hasStepNumbers = html.includes('step-number');
        
        console.log(`Steps indicator: ${hasStepsIndicator ? '✅' : '❌'}`);
        console.log(`Step labels: ${hasStepLabels ? '✅' : '❌'}`);
        console.log(`Step numbers: ${hasStepNumbers ? '✅' : '❌'}`);
        
        // Test 4: Check for form elements
        console.log('\n4. Testing form elements...');
        const hasDocumento = html.includes('documento_identidad');
        const hasEstudiante = html.includes('numero_estudiante');
        const hasPrograma = html.includes('numero_programa');
        const hasTipoCertificado = html.includes('tipoCertificado');
        
        console.log(`Documento field: ${hasDocumento ? '✅' : '❌'}`);
        console.log(`Estudiante field: ${hasEstudiante ? '✅' : '❌'}`);
        console.log(`Programa field: ${hasPrograma ? '✅' : '❌'}`);
        console.log(`Tipo certificado field: ${hasTipoCertificado ? '✅' : '❌'}`);
        
        // Test 5: Check for preview elements
        console.log('\n5. Testing preview elements...');
        const hasPreviewLayout = html.includes('preview-layout');
        const hasCajaPreview = html.includes('caja__preview');
        const hasCertificado = html.includes('certificado');
        
        console.log(`Preview layout: ${hasPreviewLayout ? '✅' : '❌'}`);
        console.log(`Caja preview: ${hasCajaPreview ? '✅' : '❌'}`);
        console.log(`Certificado div: ${hasCertificado ? '✅' : '❌'}`);
        
        console.log('\n=== SUMMARY ===');
        const allTests = [hasWizard, hasStepDatos, hasStepPreview, hasStepsIndicator, 
                          hasStepLabels, hasStepNumbers, hasDocumento, hasEstudiante, 
                          hasPrograma, hasTipoCertificado, hasPreviewLayout, hasCajaPreview, hasCertificado];
        const passedTests = allTests.filter(test => test).length;
        const totalTests = allTests.length;
        
        console.log(`Tests passed: ${passedTests}/${totalTests}`);
        console.log(passedTests === totalTests ? '🎉 All tests passed!' : '⚠️ Some tests failed');
    })
    .catch(error => {
        console.error('❌ Error accessing Angular app:', error);
    });

console.log('Test script completed. Check results above.');