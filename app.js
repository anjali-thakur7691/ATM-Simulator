/**
 * NexBank CyberATM v3.0 - Next-Gen Feature-Rich Engine
 * Includes Voice Assistant, Multi-Language, Fund Transfers, Mobile Recharge & PDF Receipts
 */

// ==========================================================================
// 1. Web Audio API Synthesizer (Realistic Mechanical Sound FX)
// ==========================================================================
class ATMAudioEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playKeyBeep() {
        if (!this.enabled) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
    }

    playCardChime() {
        if (!this.enabled) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.25);
    }

    playCashCount() {
        if (!this.enabled) return;
        this.init();
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150 + Math.random() * 80, this.ctx.currentTime);
                gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.06);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.06);
            }, i * 120);
        }
    }

    playReceiptPrint() {
        if (!this.enabled) return;
        this.init();
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(600, this.ctx.currentTime);
                gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.1);
            }, i * 180);
        }
    }

    playError() {
        if (!this.enabled) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
    }
}

// ==========================================================================
// 2. Speech Synthesis Voice Assistant
// ==========================================================================
class ATMVoiceAssistant {
    constructor() {
        this.synth = window.speechSynthesis || null;
        this.enabled = true;
        this.lang = 'en-US';
    }

    speak(text) {
        if (!this.enabled || !this.synth) return;
        this.synth.cancel(); // Cancel ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.lang = this.lang;
        this.synth.speak(utterance);
    }
}

// ==========================================================================
// 3. Multi-Language Translations Dictionary
// ==========================================================================
const i18n = {
    en: {
        welcomeTitle: "NEXUS BANK ATM",
        welcomeSub: "Please insert your Debit/Credit card or select one on the right wallet",
        insertBtn: "📥 INSERT CARD NOW",
        enterPinTitle: "ENTER YOUR 4-DIGIT PIN",
        enterPinSub: "Use Keypad below or Numpad on keyboard",
        cancelBtn: "◄ CANCEL / BACK",
        menuBalance: "Balance Inquiry",
        menuStatement: "Mini Statement",
        menuWithdraw: "Cash Withdrawal",
        menuChangePin: "Change PIN",
        menuDeposit: "Deposit Cash",
        menuTransfer: "Fund Transfer",
        menuFastCash: "Fast Cash",
        menuRecharge: "Mobile Recharge",
        menuEject: "Eject Card",
        availBal: "AVAILABLE BALANCE",
        savingsAcc: "Savings Account:",
        printRec: "Print Receipt",
        tipText: "💡 <strong>Tip:</strong> Click any screen option directly, or press RED CANCEL button to go <strong>BACK</strong>"
    },
    hi: {
        welcomeTitle: "नेक्सस बैंक एटीएम",
        welcomeSub: "कृपया अपना डेबिट/क्रेडिट कार्ड डालें या दाएं वॉलेट से चुनें",
        insertBtn: "📥 कार्ड डालें",
        enterPinTitle: "अपना 4-अंकीय पिन दर्ज करें",
        enterPinSub: "नीचे दिए गए कीपैड का उपयोग करें",
        cancelBtn: "◄ रद्द करें / वापस जाएं",
        menuBalance: "बैलेंस जांच",
        menuStatement: "मिनी स्टेटमेंट",
        menuWithdraw: "नकद निकासी",
        menuChangePin: "पिन बदलें",
        menuDeposit: "नकद जमा",
        menuTransfer: "फंड ट्रांसफर",
        menuFastCash: "फास्ट कैश",
        menuRecharge: "मोबाइल रिचार्ज",
        menuEject: "कार्ड निकालें",
        availBal: "उपलब्ध बैलेंस",
        savingsAcc: "बचत खाता:",
        printRec: "रसीद प्रिंट करें",
        tipText: "💡 <strong>सुझाव:</strong> किसी भी स्क्रीन विकल्प पर क्लिक करें, या वापस जाने के लिए लाल CANCEL बटन दबाएं"
    },
    hinglish: {
        welcomeTitle: "NEXUS BANK ATM",
        welcomeSub: "Apna Debit/Credit card insert karein ya wallet se select karein",
        insertBtn: "📥 INSERT CARD NOW",
        enterPinTitle: "APNA 4-DIGIT PIN ENTER KAREIN",
        enterPinSub: "Niche diye gaye Keypad ka use karein",
        cancelBtn: "◄ CANCEL / BACK",
        menuBalance: "Balance Inquiry",
        menuStatement: "Mini Statement",
        menuWithdraw: "Cash Withdrawal",
        menuChangePin: "Change PIN",
        menuDeposit: "Cash Deposit",
        menuTransfer: "Fund Transfer",
        menuFastCash: "Fast Cash",
        menuRecharge: "Mobile Recharge",
        menuEject: "Eject Card",
        availBal: "AVAILABLE BALANCE",
        savingsAcc: "Savings Account:",
        printRec: "Print Receipt",
        tipText: "💡 <strong>Tip:</strong> Direct screen button par click karein ya Back jaane ke liye RED CANCEL button dabayein"
    }
};

// ==========================================================================
// 4. Initial Data Store & State
// ==========================================================================
const mockCards = [
    {
        id: "card_1",
        holder: "Alex Morgan",
        number: "4532 8910 2341 8821",
        pin: "1234",
        type: "Visa Platinum",
        savingsBalance: 4250.00,
        checkingBalance: 1200.00,
        transactions: [
            { type: "Deposit", amount: 500, date: "2026-09-01 10:30", balanceAfter: 4250.00 },
            { type: "Withdrawal", amount: 100, date: "2026-08-28 16:45", balanceAfter: 3750.00 }
        ]
    },
    {
        id: "card_2",
        holder: "Samantha Reed",
        number: "5412 7522 9014 3409",
        pin: "8888",
        type: "Mastercard Gold",
        savingsBalance: 9800.50,
        checkingBalance: 3450.00,
        transactions: [
            { type: "Fast Cash", amount: 50, date: "2026-09-02 18:12", balanceAfter: 9800.50 }
        ]
    },
    {
        id: "card_3",
        holder: "Jordan Lee",
        number: "3782 8224 1009 5112",
        pin: "0000",
        type: "Amex Black VIP",
        savingsBalance: 25000.00,
        checkingBalance: 8500.00,
        transactions: [
            { type: "Deposit", amount: 2000, date: "2026-09-03 14:00", balanceAfter: 25000.00 }
        ]
    }
];

class ATMEngine {
    constructor() {
        this.audio = new ATMAudioEngine();
        this.voice = new ATMVoiceAssistant();
        this.cards = mockCards;
        this.activeCard = this.cards[0];
        this.cardInserted = false;
        
        // ATM States: 'WELCOME', 'ENTER_PIN', 'MAIN_MENU', 'BALANCE', 'WITHDRAW', 'WITHDRAW_CUSTOM', 'DEPOSIT', 'MINI_STATEMENT', 'CHANGE_PIN_OLD', 'CHANGE_PIN_NEW', 'DISPENSING', 'THANK_YOU'
        this.currentState = 'WELCOME';
        this.inputBuffer = "";
        this.pinAttempts = 0;
        this.maxAttempts = 3;
        this.currency = "$";
        this.lang = "en";
        this.selectedAccountType = "Savings";
        
        this.pendingDepositTotal = 0;
        this.initDOM();
        this.setupClock();
        this.bindEvents();
        this.renderState();
    }

    initDOM() {
        this.screenBody = document.getElementById('screen-body');
        this.screenStatusMsg = document.getElementById('screen-status-msg');
        this.cardsListContainer = document.getElementById('cards-list');
        this.cardDebugInfo = document.getElementById('card-debug-info');
        this.insertedCardPreview = document.getElementById('inserted-card-preview');
        this.insertCardBtn = document.getElementById('insert-card-action-btn');
        this.receiptPaper = document.getElementById('receipt-paper');
        this.dispenserShutterBox = document.querySelector('.dispenser-shutter-box');
        this.cashTray = document.getElementById('cash-tray');
        
        this.themeSelect = document.getElementById('theme-select');
        this.langSelect = document.getElementById('lang-select');
        this.currencySelect = document.getElementById('currency-select');
        this.soundToggleBtn = document.getElementById('sound-toggle');
        this.voiceToggleBtn = document.getElementById('voice-toggle');
        
        this.depositModal = document.getElementById('deposit-modal');
        this.depositTotalVal = document.getElementById('deposit-total-val');
        this.transferModal = document.getElementById('transfer-modal');
        this.rechargeModal = document.getElementById('recharge-modal');
        this.navTipText = document.getElementById('nav-tip-text');

        this.renderSidebarCards();
    }

    setupClock() {
        const updateClock = () => {
            const clockEl = document.getElementById('live-clock');
            if (clockEl) {
                const now = new Date();
                clockEl.textContent = now.toLocaleTimeString();
            }
        };
        updateClock();
        setInterval(updateClock, 1000);
    }

    renderSidebarCards() {
        this.cardsListContainer.innerHTML = "";
        this.cards.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = `debit-card-item ${card.id === this.activeCard.id ? 'selected' : ''}`;
            cardEl.innerHTML = `
                <div class="card-header">
                    <span>${card.type}</span>
                    <span>NEXBANK</span>
                </div>
                <div class="card-number">${card.number}</div>
                <div class="card-footer">
                    <span>HOLDER: ${card.holder.toUpperCase()}</span>
                    <span>EXPIRES: 12/29</span>
                </div>
            `;
            cardEl.addEventListener('click', () => {
                if (this.cardInserted) {
                    alert("Please eject current card first!");
                    return;
                }
                this.activeCard = card;
                this.renderSidebarCards();
                this.audio.playKeyBeep();
            });
            this.cardsListContainer.appendChild(cardEl);
        });

        this.cardDebugInfo.innerHTML = `
            <strong>Card Holder:</strong> ${this.activeCard.holder}<br>
            <strong>Card Number:</strong> ${this.activeCard.number}<br>
            <strong style="color: var(--primary-cyan);">Demo PIN: ${this.activeCard.pin}</strong><br>
            <strong>Savings Bal:</strong> ${this.currency}${this.activeCard.savingsBalance.toFixed(2)}
        `;
    }

    bindEvents() {
        // Theme Selector
        this.themeSelect.addEventListener('change', (e) => {
            document.body.setAttribute('data-theme', e.target.value);
            this.audio.playKeyBeep();
        });

        // Language Selector
        this.langSelect.addEventListener('change', (e) => {
            this.lang = e.target.value;
            this.voice.lang = this.lang === 'hi' ? 'hi-IN' : 'en-US';
            this.audio.playKeyBeep();
            this.renderState();
        });

        // Currency Selector
        this.currencySelect.addEventListener('change', (e) => {
            this.currency = e.target.value;
            document.querySelectorAll('.curr-sym').forEach(el => el.textContent = this.currency);
            this.renderSidebarCards();
            this.renderState();
        });

        // Voice Assistant Toggle
        this.voiceToggleBtn.addEventListener('click', () => {
            this.voice.enabled = !this.voice.enabled;
            this.voiceToggleBtn.classList.toggle('active', this.voice.enabled);
            this.voiceToggleBtn.innerHTML = this.voice.enabled ? `<span class="voice-icon">🗣️</span> Voice ON` : `<span class="voice-icon">🔇</span> Voice OFF`;
            if (this.voice.enabled) {
                this.voice.speak("Voice guidance enabled.");
            }
        });

        // Sound FX Toggle
        this.soundToggleBtn.addEventListener('click', () => {
            this.audio.enabled = !this.audio.enabled;
            this.soundToggleBtn.classList.toggle('active', this.audio.enabled);
            this.soundToggleBtn.innerHTML = this.audio.enabled ? `<span class="sound-icon">🔊</span> Beep ON` : `<span class="sound-icon">🔇</span> Beep OFF`;
        });

        // Insert Card Action
        this.insertCardBtn.addEventListener('click', () => this.toggleCardInsertion());

        // Hardware Screen Keys (L1-L4, R1-R4)
        document.querySelectorAll('.screen-key').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.add('pressed');
                setTimeout(() => btn.classList.remove('pressed'), 150);
                this.handleScreenKey(btn.dataset.key);
            });
        });

        // Keypad Buttons
        document.querySelectorAll('.keypad-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.add('pressed');
                setTimeout(() => btn.classList.remove('pressed'), 150);

                if (btn.dataset.val !== undefined) {
                    this.handleInputDigit(btn.dataset.val);
                } else if (btn.dataset.action) {
                    this.handleKeypadAction(btn.dataset.action);
                }
            });
        });

        // Hardware Keyboard Listeners
        window.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                this.handleInputDigit(e.key);
            } else if (e.key === 'Enter') {
                this.handleKeypadAction('enter');
            } else if (e.key === 'Backspace') {
                this.handleKeypadAction('backspace');
            } else if (e.key === 'Escape') {
                this.handleKeypadAction('cancel');
            } else if (e.key === 'Delete') {
                this.handleKeypadAction('clear');
            }
        });

        // Receipt Close & Print PDF
        document.getElementById('close-receipt-btn').addEventListener('click', () => {
            this.receiptPaper.classList.remove('printed');
            this.audio.playKeyBeep();
        });

        document.getElementById('print-pdf-btn').addEventListener('click', () => {
            window.print();
        });

        // Deposit Modal Events
        document.querySelectorAll('.bill-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const denom = parseInt(btn.dataset.denom);
                this.pendingDepositTotal += denom;
                this.depositTotalVal.textContent = `${this.currency}${this.pendingDepositTotal}`;
                this.audio.playKeyBeep();
            });
        });

        document.getElementById('cancel-deposit-btn').addEventListener('click', () => {
            this.depositModal.classList.add('hidden');
            this.pendingDepositTotal = 0;
            this.audio.playKeyBeep();
        });

        document.getElementById('confirm-deposit-btn').addEventListener('click', () => {
            if (this.pendingDepositTotal <= 0) {
                alert("Please select at least one bill to deposit!");
                return;
            }
            this.depositModal.classList.add('hidden');
            this.processDeposit(this.pendingDepositTotal);
            this.pendingDepositTotal = 0;
        });

        // Fund Transfer Modal Events
        document.getElementById('cancel-transfer-btn').addEventListener('click', () => {
            this.transferModal.classList.add('hidden');
            this.audio.playKeyBeep();
        });

        document.getElementById('confirm-transfer-btn').addEventListener('click', () => {
            const accNum = document.getElementById('transfer-acc-input').value.trim();
            const amt = parseFloat(document.getElementById('transfer-amt-input').value);

            if (accNum.length !== 10 || isNaN(accNum)) {
                alert("Please enter a valid 10-digit beneficiary account number!");
                return;
            }
            if (isNaN(amt) || amt <= 0) {
                alert("Please enter a valid transfer amount!");
                return;
            }
            this.transferModal.classList.add('hidden');
            this.processTransfer(accNum, amt);
        });

        // Mobile Recharge Modal Events
        document.getElementById('cancel-recharge-btn').addEventListener('click', () => {
            this.rechargeModal.classList.add('hidden');
            this.audio.playKeyBeep();
        });

        document.getElementById('confirm-recharge-btn').addEventListener('click', () => {
            const phone = document.getElementById('recharge-phone-input').value.trim();
            const amt = parseFloat(document.getElementById('recharge-plan-select').value);

            if (phone.length !== 10 || isNaN(phone)) {
                alert("Please enter a valid 10-digit mobile number!");
                return;
            }
            this.rechargeModal.classList.add('hidden');
            this.processRecharge(phone, amt);
        });
    }

    toggleCardInsertion() {
        if (!this.cardInserted) {
            this.cardInserted = true;
            this.insertedCardPreview.classList.add('inserted');
            this.insertCardBtn.innerHTML = `<span>📤 Eject Card</span>`;
            this.insertCardBtn.style.background = "#ef4444";
            this.insertCardBtn.style.color = "#fff";
            this.audio.playCardChime();
            this.voice.speak("Card inserted. Please enter your 4-digit PIN.");
            this.currentState = 'ENTER_PIN';
            this.inputBuffer = "";
            this.renderState();
        } else {
            this.ejectCard();
        }
    }

    ejectCard() {
        this.cardInserted = false;
        this.insertedCardPreview.classList.remove('inserted');
        this.insertCardBtn.innerHTML = `<span>📥 Insert Card</span>`;
        this.insertCardBtn.style.background = "var(--primary-cyan)";
        this.insertCardBtn.style.color = "#000";
        this.audio.playCardChime();
        this.voice.speak("Thank you for banking with Nexus Bank. Please take your card.");
        this.currentState = 'THANK_YOU';
        this.renderState();

        setTimeout(() => {
            this.currentState = 'WELCOME';
            this.renderState();
        }, 2500);
    }

    goBackToMainMenu() {
        this.audio.playKeyBeep();
        if (this.currentState !== 'WELCOME' && this.currentState !== 'MAIN_MENU') {
            this.currentState = 'MAIN_MENU';
            this.inputBuffer = "";
            this.renderState();
        } else if (this.currentState === 'MAIN_MENU' || this.currentState === 'ENTER_PIN') {
            this.ejectCard();
        }
    }

    handleInputDigit(digit) {
        if (!this.cardInserted) {
            this.audio.playError();
            return;
        }
        this.audio.playKeyBeep();

        if (this.currentState === 'ENTER_PIN' || this.currentState === 'CHANGE_PIN_OLD' || this.currentState === 'CHANGE_PIN_NEW') {
            if (this.inputBuffer.length < 4) {
                this.inputBuffer += digit;
                this.renderState();
            }
        } else if (this.currentState === 'WITHDRAW_CUSTOM') {
            if (this.inputBuffer.length < 5) {
                this.inputBuffer += digit;
                this.renderState();
            }
        }
    }

    handleKeypadAction(action) {
        this.audio.playKeyBeep();
        if (action === 'cancel') {
            this.goBackToMainMenu();
        } else if (action === 'clear' || action === 'backspace') {
            this.inputBuffer = this.inputBuffer.slice(0, -1);
            this.renderState();
        } else if (action === 'enter') {
            this.processEnterAction();
        }
    }

    processEnterAction() {
        if (this.currentState === 'ENTER_PIN') {
            if (this.inputBuffer === this.activeCard.pin) {
                this.pinAttempts = 0;
                this.currentState = 'MAIN_MENU';
                this.inputBuffer = "";
                this.voice.speak(`Welcome ${this.activeCard.holder}. Please select a service.`);
                this.renderState();
            } else {
                this.pinAttempts++;
                this.audio.playError();
                this.voice.speak("Incorrect PIN. Please try again.");
                if (this.pinAttempts >= this.maxAttempts) {
                    alert("Security Alert: 3 Incorrect PIN attempts. Card ejected!");
                    this.ejectCard();
                } else {
                    alert(`Incorrect PIN! Attempts remaining: ${this.maxAttempts - this.pinAttempts}`);
                    this.inputBuffer = "";
                    this.renderState();
                }
            }
        } else if (this.currentState === 'WITHDRAW_CUSTOM') {
            const amount = parseInt(this.inputBuffer);
            if (isNaN(amount) || amount <= 0) {
                alert("Please enter a valid amount!");
                return;
            }
            if (amount % 10 !== 0) {
                alert("Please enter an amount in multiples of 10!");
                return;
            }
            this.processWithdrawal(amount);
            this.inputBuffer = "";
        } else if (this.currentState === 'CHANGE_PIN_OLD') {
            if (this.inputBuffer === this.activeCard.pin) {
                this.currentState = 'CHANGE_PIN_NEW';
                this.inputBuffer = "";
                this.renderState();
            } else {
                this.audio.playError();
                alert("Current PIN does not match!");
                this.inputBuffer = "";
                this.renderState();
            }
        } else if (this.currentState === 'CHANGE_PIN_NEW') {
            if (this.inputBuffer.length === 4) {
                this.activeCard.pin = this.inputBuffer;
                alert("PIN changed successfully!");
                this.voice.speak("Your PIN has been changed successfully.");
                this.renderSidebarCards();
                this.currentState = 'MAIN_MENU';
                this.inputBuffer = "";
                this.renderState();
            } else {
                alert("New PIN must be 4 digits!");
            }
        }
    }

    handleScreenKey(key) {
        this.audio.playKeyBeep();

        if (this.currentState === 'WELCOME') {
            if (key === 'R4' || key === 'L4') {
                this.toggleCardInsertion();
            }
        } else if (this.currentState === 'MAIN_MENU') {
            switch (key) {
                case 'L1': this.currentState = 'BALANCE'; break;
                case 'L2': this.currentState = 'WITHDRAW'; break;
                case 'L3': 
                    this.pendingDepositTotal = 0;
                    this.depositTotalVal.textContent = `${this.currency}0`;
                    this.depositModal.classList.remove('hidden');
                    break;
                case 'L4': this.currentState = 'FAST_CASH'; break;
                case 'R1': this.currentState = 'MINI_STATEMENT'; break;
                case 'R2': this.currentState = 'CHANGE_PIN_OLD'; this.inputBuffer = ""; break;
                case 'R3': this.transferModal.classList.remove('hidden'); break;
                case 'R4': this.ejectCard(); return;
            }
            this.renderState();
        } else if (this.currentState === 'BALANCE' || this.currentState === 'MINI_STATEMENT') {
            if (key === 'R1') {
                this.printReceipt(this.currentState === 'BALANCE' ? 'Balance Inquiry' : 'Mini Statement');
            } else if (key === 'R4' || key === 'L4') {
                this.goBackToMainMenu();
            }
        } else if (this.currentState === 'WITHDRAW') {
            switch (key) {
                case 'L1': this.processWithdrawal(20); break;
                case 'L2': this.processWithdrawal(50); break;
                case 'L3': this.processWithdrawal(100); break;
                case 'R1': this.processWithdrawal(200); break;
                case 'R2': this.processWithdrawal(500); break;
                case 'R3': this.currentState = 'WITHDRAW_CUSTOM'; this.inputBuffer = ""; this.renderState(); break;
                case 'R4': this.goBackToMainMenu(); break;
            }
        } else if (this.currentState === 'FAST_CASH') {
            if (key === 'L1') this.processWithdrawal(50);
            else if (key === 'L2') this.processWithdrawal(100);
            else if (key === 'R4') this.goBackToMainMenu();
        } else if (this.currentState === 'WITHDRAW_CUSTOM' || this.currentState === 'CHANGE_PIN_OLD' || this.currentState === 'CHANGE_PIN_NEW') {
            if (key === 'R4') this.goBackToMainMenu();
        }
    }

    processWithdrawal(amount) {
        const currentBal = this.activeCard.savingsBalance;
        if (amount > currentBal) {
            this.audio.playError();
            this.voice.speak("Insufficient funds in account.");
            alert(`Insufficient funds! Your current balance is ${this.currency}${currentBal.toFixed(2)}`);
            return;
        }

        this.activeCard.savingsBalance -= amount;

        const now = new Date();
        const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0].substring(0, 5)}`;
        this.activeCard.transactions.unshift({
            type: "Withdrawal",
            amount: amount,
            date: dateStr,
            balanceAfter: this.activeCard.savingsBalance
        });

        this.renderSidebarCards();
        this.triggerDispenserAnimation(amount);
    }

    processDeposit(amount) {
        this.activeCard.savingsBalance += amount;

        const now = new Date();
        const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0].substring(0, 5)}`;
        this.activeCard.transactions.unshift({
            type: "Deposit",
            amount: amount,
            date: dateStr,
            balanceAfter: this.activeCard.savingsBalance
        });

        this.renderSidebarCards();
        this.audio.playCashCount();
        this.voice.speak(`Successfully deposited ${amount} dollars.`);
        alert(`Successfully deposited ${this.currency}${amount}!`);
        this.currentState = 'MAIN_MENU';
        this.renderState();
    }

    processTransfer(accNum, amount) {
        if (amount > this.activeCard.savingsBalance) {
            this.audio.playError();
            this.voice.speak("Insufficient balance for transfer.");
            alert("Insufficient balance for transfer!");
            return;
        }

        this.activeCard.savingsBalance -= amount;
        const now = new Date();
        const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0].substring(0, 5)}`;
        this.activeCard.transactions.unshift({
            type: `Transfer to A/C ${accNum.slice(-4)}`,
            amount: amount,
            date: dateStr,
            balanceAfter: this.activeCard.savingsBalance
        });

        this.renderSidebarCards();
        this.audio.playKeyBeep();
        this.voice.speak(`Transferred ${amount} dollars successfully to account number ${accNum.slice(-4)}.`);
        this.printReceipt(`Fund Transfer to ${accNum}`, amount);
        alert(`Successfully transferred ${this.currency}${amount} to Account ${accNum}!`);
        this.currentState = 'MAIN_MENU';
        this.renderState();
    }

    processRecharge(phone, amount) {
        if (amount > this.activeCard.savingsBalance) {
            this.audio.playError();
            this.voice.speak("Insufficient balance for recharge.");
            alert("Insufficient balance for recharge!");
            return;
        }

        this.activeCard.savingsBalance -= amount;
        const now = new Date();
        const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0].substring(0, 5)}`;
        this.activeCard.transactions.unshift({
            type: `Mobile Recharge (${phone.slice(-4)})`,
            amount: amount,
            date: dateStr,
            balanceAfter: this.activeCard.savingsBalance
        });

        this.renderSidebarCards();
        this.audio.playKeyBeep();
        this.voice.speak(`Mobile recharge of ${amount} dollars successful for mobile number ${phone}.`);
        this.printReceipt(`Mobile Recharge ${phone}`, amount);
        alert(`Successfully recharged mobile ${phone} for ${this.currency}${amount}!`);
        this.currentState = 'MAIN_MENU';
        this.renderState();
    }

    triggerDispenserAnimation(amount) {
        this.currentState = 'DISPENSING';
        this.renderState();
        this.audio.playCashCount();
        this.voice.speak("Cash dispensing in progress. Please collect your cash below.");

        setTimeout(() => {
            this.dispenserShutterBox.classList.add('open');
            this.cashTray.innerHTML = `
                <div class="cash-bill-stack">
                    <span>💵 ${this.currency}${amount}</span>
                    <small style="font-size: 10px; margin-top: 4px;">Click to collect</small>
                </div>
            `;
            const cashStack = this.cashTray.querySelector('.cash-bill-stack');
            cashStack.addEventListener('click', () => {
                this.audio.playKeyBeep();
                this.cashTray.innerHTML = "";
                this.dispenserShutterBox.classList.remove('open');
                this.printReceipt('Cash Withdrawal', amount);
                this.currentState = 'MAIN_MENU';
                this.renderState();
            });
        }, 1000);
    }

    printReceipt(txType, amount = 0) {
        this.audio.playReceiptPrint();
        const now = new Date();
        document.getElementById('rec-date').textContent = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0].substring(0, 5)}`;
        
        const recDetails = document.getElementById('rec-details');
        recDetails.innerHTML = `
            <p><span>Card:</span> <span>•••• ${this.activeCard.number.slice(-4)}</span></p>
            <p><span>Tx Type:</span> <span>${txType}</span></p>
            ${amount > 0 ? `<p><span>Amount:</span> <span>${this.currency}${amount}</span></p>` : ''}
            <p><span>Account:</span> <span>${this.selectedAccountType}</span></p>
            <p><span>Avail Bal:</span> <span>${this.currency}${this.activeCard.savingsBalance.toFixed(2)}</span></p>
            <p><span>Ref No:</span> <span>${Math.floor(100000 + Math.random() * 900000)}</span></p>
        `;

        this.receiptPaper.classList.add('printed');
    }

    attachScreenButtonListeners() {
        this.screenBody.querySelectorAll('.menu-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.audio.playKeyBeep();

                if (action === 'back') {
                    this.goBackToMainMenu();
                } else if (action === 'insert_card') {
                    this.toggleCardInsertion();
                } else if (action === 'balance') {
                    this.currentState = 'BALANCE';
                    this.voice.speak(`Your available savings balance is ${this.activeCard.savingsBalance} dollars.`);
                    this.renderState();
                } else if (action === 'withdraw') {
                    this.currentState = 'WITHDRAW';
                    this.voice.speak("Please select cash withdrawal amount.");
                    this.renderState();
                } else if (action === 'deposit') {
                    this.pendingDepositTotal = 0;
                    this.depositTotalVal.textContent = `${this.currency}0`;
                    this.depositModal.classList.remove('hidden');
                } else if (action === 'fast_cash') {
                    this.currentState = 'FAST_CASH';
                    this.renderState();
                } else if (action === 'statement') {
                    this.currentState = 'MINI_STATEMENT';
                    this.renderState();
                } else if (action === 'change_pin') {
                    this.currentState = 'CHANGE_PIN_OLD';
                    this.inputBuffer = "";
                    this.renderState();
                } else if (action === 'transfer') {
                    this.transferModal.classList.remove('hidden');
                } else if (action === 'recharge') {
                    this.rechargeModal.classList.remove('hidden');
                } else if (action === 'eject') {
                    this.ejectCard();
                } else if (action === 'print_receipt') {
                    this.printReceipt(this.currentState === 'BALANCE' ? 'Balance Inquiry' : 'Mini Statement');
                } else if (action === 'withdraw_preset') {
                    const amt = parseInt(btn.dataset.amount);
                    this.processWithdrawal(amt);
                } else if (action === 'withdraw_custom') {
                    this.currentState = 'WITHDRAW_CUSTOM';
                    this.inputBuffer = "";
                    this.renderState();
                }
            });
        });
    }

    renderState() {
        const langText = i18n[this.lang] || i18n.en;
        this.navTipText.innerHTML = langText.tipText;

        let html = "";
        let status = "System Ready";

        switch (this.currentState) {
            case 'WELCOME':
                status = langText.welcomeSub;
                html = `
                    <div style="text-align: center;">
                        <h2 class="screen-title" style="color: var(--primary-cyan);">${langText.welcomeTitle}</h2>
                        <p class="screen-subtitle">${langText.welcomeSub}</p>
                        <button class="menu-btn" data-action="insert_card" style="margin: 16px auto; max-width: 200px; justify-content: center; background: var(--primary-cyan); color: #000; font-size: 14px;">
                            ${langText.insertBtn}
                        </button>
                    </div>
                `;
                break;

            case 'ENTER_PIN':
                status = "Security Check: Enter 4-digit PIN";
                const dots = [0,1,2,3].map(i => `<div class="pin-dot ${i < this.inputBuffer.length ? 'filled' : ''}"></div>`).join('');
                html = `
                    <div style="text-align: center; width: 100%;">
                        <h2 class="screen-title">${langText.enterPinTitle}</h2>
                        <p class="screen-subtitle">${langText.enterPinSub}</p>
                        <div class="pin-display-box" style="justify-content: center;">${dots}</div>
                        <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">Press GREEN ENTER button to confirm</p>
                        <button class="menu-btn back-btn" data-action="eject" style="max-width: 220px; margin: 0 auto; justify-content: center;">
                            ${langText.cancelBtn}
                        </button>
                    </div>
                `;
                break;

            case 'MAIN_MENU':
                status = `Welcome, ${this.activeCard.holder}! Select service`;
                html = `
                    <div class="screen-menu-grid">
                        <button class="menu-btn left" data-action="balance"><span class="indicator">◄</span> ${langText.menuBalance}</button>
                        <button class="menu-btn right" data-action="statement">${langText.menuStatement} <span class="indicator">►</span></button>

                        <button class="menu-btn left" data-action="withdraw"><span class="indicator">◄</span> ${langText.menuWithdraw}</button>
                        <button class="menu-btn right" data-action="change_pin">${langText.menuChangePin} <span class="indicator">►</span></button>

                        <button class="menu-btn left" data-action="deposit"><span class="indicator">◄</span> ${langText.menuDeposit}</button>
                        <button class="menu-btn right" data-action="transfer">${langText.menuTransfer} <span class="indicator">►</span></button>

                        <button class="menu-btn left" data-action="fast_cash"><span class="indicator">◄</span> ${langText.menuFastCash}</button>
                        <button class="menu-btn right back-btn" data-action="eject">${langText.menuEject} <span class="indicator">►</span></button>
                    </div>
                `;
                break;

            case 'BALANCE':
                status = "Account Balance Summary";
                html = `
                    <div style="text-align: center; width: 100%;">
                        <h2 class="screen-title">${langText.availBal}</h2>
                        <div style="background: rgba(0, 229, 255, 0.05); border: 1px solid var(--primary-cyan); padding: 14px; border-radius: 8px; margin: 10px 0;">
                            <p style="font-size: 12px; color: var(--text-muted);">${langText.savingsAcc}</p>
                            <h1 style="color: var(--primary-cyan); font-family: var(--font-mono);">${this.currency}${this.activeCard.savingsBalance.toFixed(2)}</h1>
                        </div>
                        <div class="screen-menu-grid" style="grid-template-rows: 1fr; margin-top: 8px;">
                            <button class="menu-btn left" data-action="print_receipt"><span class="indicator">◄</span> ${langText.printRec}</button>
                            <button class="menu-btn right back-btn" data-action="back">◄ BACK TO MAIN MENU <span class="indicator">►</span></button>
                        </div>
                    </div>
                `;
                break;

            case 'WITHDRAW':
                status = "Select Cash Amount";
                html = `
                    <div class="screen-menu-grid">
                        <button class="menu-btn left" data-action="withdraw_preset" data-amount="20"><span class="indicator">◄</span> ${this.currency}20</button>
                        <button class="menu-btn right" data-action="withdraw_preset" data-amount="200">${this.currency}200 <span class="indicator">►</span></button>

                        <button class="menu-btn left" data-action="withdraw_preset" data-amount="50"><span class="indicator">◄</span> ${this.currency}50</button>
                        <button class="menu-btn right" data-action="withdraw_preset" data-amount="500">${this.currency}500 <span class="indicator">►</span></button>

                        <button class="menu-btn left" data-action="withdraw_preset" data-amount="100"><span class="indicator">◄</span> ${this.currency}100</button>
                        <button class="menu-btn right" data-action="withdraw_custom">Custom Amount <span class="indicator">►</span></button>

                        <button class="menu-btn left"></button>
                        <button class="menu-btn right back-btn" data-action="back">◄ BACK TO MENU <span class="indicator">►</span></button>
                    </div>
                `;
                break;

            case 'WITHDRAW_CUSTOM':
                status = "Enter Custom Amount (Multiples of 10)";
                html = `
                    <div style="text-align: center; width: 100%;">
                        <h2 class="screen-title">ENTER CUSTOM AMOUNT</h2>
                        <p class="screen-subtitle">Use Keypad to type amount & press ENTER</p>
                        <div style="font-family: var(--font-mono); font-size: 26px; color: var(--primary-cyan); margin: 10px 0; border-bottom: 2px solid var(--primary-cyan); display: inline-block; padding: 0 16px;">
                            ${this.currency}${this.inputBuffer || '0'}
                        </div>
                        <div style="margin-top: 14px;">
                            <button class="menu-btn back-btn" data-action="back" style="max-width: 240px; margin: 0 auto; justify-content: center;">
                                ◄ BACK TO MAIN MENU (CANCEL)
                            </button>
                        </div>
                    </div>
                `;
                break;

            case 'FAST_CASH':
                status = "Fast Cash - Quick Select";
                html = `
                    <div class="screen-menu-grid">
                        <button class="menu-btn left" data-action="withdraw_preset" data-amount="50"><span class="indicator">◄</span> ${this.currency}50 Fast Cash</button>
                        <button class="menu-btn right" data-action="withdraw_preset" data-amount="100">${this.currency}100 Fast Cash <span class="indicator">►</span></button>

                        <button class="menu-btn left"></button>
                        <button class="menu-btn right back-btn" data-action="back">◄ BACK TO MENU <span class="indicator">►</span></button>
                    </div>
                `;
                break;

            case 'CHANGE_PIN_OLD':
                status = "Enter Current PIN";
                html = `
                    <div style="text-align: center; width: 100%;">
                        <h2 class="screen-title">ENTER CURRENT PIN</h2>
                        <div class="pin-display-box" style="justify-content: center;">${[0,1,2,3].map(i => `<div class="pin-dot ${i < this.inputBuffer.length ? 'filled' : ''}"></div>`).join('')}</div>
                        <button class="menu-btn back-btn" data-action="back" style="max-width: 220px; margin: 12px auto 0; justify-content: center;">
                            ◄ CANCEL / BACK TO MENU
                        </button>
                    </div>
                `;
                break;

            case 'CHANGE_PIN_NEW':
                status = "Enter New 4-Digit PIN";
                html = `
                    <div style="text-align: center; width: 100%;">
                        <h2 class="screen-title" style="color: var(--accent-emerald);">ENTER NEW PIN</h2>
                        <div class="pin-display-box" style="justify-content: center;">${[0,1,2,3].map(i => `<div class="pin-dot ${i < this.inputBuffer.length ? 'filled' : ''}"></div>`).join('')}</div>
                        <button class="menu-btn back-btn" data-action="back" style="max-width: 220px; margin: 12px auto 0; justify-content: center;">
                            ◄ CANCEL / BACK TO MENU
                        </button>
                    </div>
                `;
                break;

            case 'MINI_STATEMENT':
                status = "Recent 3 Transactions";
                const txItems = this.activeCard.transactions.slice(0, 3).map(tx => `
                    <div style="display: flex; justify-content: space-between; font-size: 11px; padding: 4px 0; border-bottom: 1px dashed #1e293b;">
                        <span>${tx.date.split(' ')[0]}</span>
                        <span style="color: ${tx.type.includes('Deposit') ? 'var(--accent-emerald)' : '#ef4444'};">${tx.type}</span>
                        <span style="font-family: var(--font-mono);">${this.currency}${tx.amount}</span>
                    </div>
                `).join('');
                html = `
                    <div style="width: 100%;">
                        <h3 style="font-size: 13px; text-align: center; color: var(--primary-cyan); margin-bottom: 6px;">MINI STATEMENT</h3>
                        <div>${txItems.length ? txItems : '<p style="text-align: center; font-size: 12px;">No recent transactions</p>'}</div>
                        <div class="screen-menu-grid" style="grid-template-rows: 1fr; margin-top: 8px;">
                            <button class="menu-btn left" data-action="print_receipt"><span class="indicator">◄</span> Print Statement</button>
                            <button class="menu-btn right back-btn" data-action="back">◄ BACK TO MENU <span class="indicator">►</span></button>
                        </div>
                    </div>
                `;
                break;

            case 'DISPENSING':
                status = "Dispensing Cash... Please Wait";
                html = `
                    <div style="text-align: center;">
                        <h2 class="screen-title" style="color: var(--accent-emerald);">DISPENSING CASH</h2>
                        <p class="screen-subtitle">Please collect your cash from the tray below</p>
                        <div style="font-size: 32px; animation: bounce 1s infinite; margin-top: 16px;">💵 ⏳</div>
                    </div>
                `;
                break;

            case 'THANK_YOU':
                status = "Transaction Complete";
                html = `
                    <div style="text-align: center;">
                        <h2 class="screen-title" style="color: var(--primary-cyan);">THANK YOU</h2>
                        <p class="screen-subtitle">Please take your card and cash</p>
                        <p style="font-size: 12px; color: var(--accent-emerald); margin-top: 16px;">Have a nice day!</p>
                    </div>
                `;
                break;
        }

        this.screenBody.innerHTML = html;
        this.screenStatusMsg.textContent = status;
        this.attachScreenButtonListeners();
    }
}

// Instantiate ATM App when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.atmEngine = new ATMEngine();
});
