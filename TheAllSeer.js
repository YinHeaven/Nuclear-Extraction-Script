// === NUCLEAR SCRIPT FOR BROWSER CONSOLE ===
// PASTE THIS IN THE CONSOLE (F12) AND PRESS ENTER

(function() {
    console.clear();
    console.log('%c🔥 NUCLEAR EXTRACTION SCRIPT 🔥', 'color: red; font-size: 20px; font-weight: bold');
    console.log('%c⚠️  ONLY FOR YOUR OWN ACCOUNTS ⚠️', 'color: orange; font-size: 16px');
    
    let results = {
        localStorage: [],
        sessionStorage: [],
        cookies: [],
        inputs: [],
        meta: [],
        scripts: [],
        forms: []
    };
    
    // 1. LOCALSTORAGE - EVERYTHING, not just keywords
    console.log('%c📦 LOCALSTORAGE (COMPLETE)', 'color: cyan; font-weight: bold');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`  ${key}:`, value);
        results.localStorage.push({key, value});
    }
    
    // 2. SESSIONSTORAGE - EVERYTHING
    console.log('%c\n📦 SESSIONSTORAGE (COMPLETE)', 'color: cyan; font-weight: bold');
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        console.log(`  ${key}:`, value);
        results.sessionStorage.push({key, value});
    }
    
    // 3. COOKIES - ALL OF THEM
    console.log('%c\n🍪 COOKIES (COMPLETE)', 'color: cyan; font-weight: bold');
    const cookies = document.cookie.split(';').filter(c => c.trim());
    cookies.forEach(cookie => {
        const [key, value] = cookie.trim().split('=');
        console.log(`  ${key}: ${value}`);
        results.cookies.push({key, value});
    });
    
    // 4. ALL INPUTS (including hidden ones)
    console.log('%c\n📝 FORM INPUTS', 'color: cyan; font-weight: bold');
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        const type = input.type || 'text';
        const name = input.name || input.id || 'no-name';
        const value = input.value || '(empty)';
        console.log(`  ${name} (${type}): ${value}`);
        results.inputs.push({
            type,
            name,
            id: input.id,
            name: input.name,
            value: input.value,
            placeholder: input.placeholder
        });
    });
    
    // 5. SECURITY METADATA
    console.log('%c\n🏷️ METADATA', 'color: cyan; font-weight: bold');
    const metas = document.querySelectorAll('meta');
    metas.forEach(meta => {
        const name = meta.getAttribute('name') || meta.getAttribute('property') || 'meta';
        const content = meta.getAttribute('content');
        if (content) {
            console.log(`  ${name}: ${content}`);
            results.meta.push({name, content});
        }
    });
    
    // 6. GLOBAL VARIABLES (dangerous but useful)
    console.log('%c\n🌐 GLOBAL VARIABLES', 'color: cyan; font-weight: bold');
    const suspiciousVariables = ['token', 'auth', 'pass', 'user', 'session', 'jwt', 'api'];
    Object.keys(window).forEach(key => {
        if (suspiciousVariables.some(v => key.toLowerCase().includes(v))) {
            try {
                const value = window[key];
                console.log(`  window.${key}:`, value);
                results.scripts.push({key, value: String(value).substring(0, 200)});
            } catch(e) {
                // Ignore access errors
            }
        }
    });
    
    // 7. GENERATE REPORT
    console.log('%c\n📊 COMPLETE REPORT', 'color: green; font-size: 18px; font-weight: bold');
    console.log('Total LocalStorage:', results.localStorage.length);
    console.log('Total SessionStorage:', results.sessionStorage.length);
    console.log('Total Cookies:', results.cookies.length);
    console.log('Total Inputs:', results.inputs.length);
    
    // 8. CREATE OBJECT FOR EXPORT
    const finalReport = {
        url: window.location.href,
        title: document.title,
        timestamp: new Date().toISOString(),
        data: results
    };
    
    // 9. DISPLAY AS TABLE
    console.log('%c\n📋 SENSITIVE DATA FOUND:', 'color: yellow');
    console.table(results.inputs.filter(i => i.value && i.value.length > 0));
    
    // 10. AUTOMATIC COPY (attempt)
    try {
        const textToCopy = JSON.stringify(finalReport, null, 2);
        
        // Create temporary element to copy
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        console.log('%c✅ DATA COPIED TO CLIPBOARD', 'color: green; font-size: 16px');
        console.log('%c📋 Paste it in a notepad (Ctrl+V)', 'color: gray');
    } catch(e) {
        console.log('%c❌ Could not copy automatically', 'color: red');
        console.log('Manually copy this object:', finalReport);
    }
    
    console.log('%c\n🔒 REMEMBER: This only works for your own accounts', 'color: orange');
    console.log('%c📁 Save this in a safe place and delete it afterwards', 'color: orange');
    
    return finalReport;
})();
