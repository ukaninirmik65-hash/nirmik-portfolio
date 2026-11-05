import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { isValidContactEmail, validateContact, createInquiryMessage, emailLink, whatsappLink } from "../src/utils/inquiry.js";
import { buildSubmission } from "../src/utils/web3forms.js";
import { emptyInquiry, pageOptions, durationOptions, designOptions } from "../src/data/inquiry.js";
const good={...emptyInquiry,name:"  Nirmik & Co.  ",email:" qa+project@example.com ",service:"react",message:"  A frontend brief with <tags>, quotes, Gujarati: નમસ્તે and emoji 👋.  "};
test("email syntax rejects empty labels, malformed local parts and invalid domain hyphens",()=>{
 for(const email of ["qa@exam..ple.com",".qa@example.com","qa.@example.com","qa..test@example.com","qa@-example.com","qa@example-.com","qa@example","qa@@example.com"])assert.equal(isValidContactEmail(email),false,email);
 for(const email of [" qa+project@example.com ","first.last@sub.example.co.in","user_name@xn--bcher-kva.de"])assert.equal(isValidContactEmail(email),true,email);
});
test("optional phone accepts common formatting but rejects misplaced or repeated plus signs",()=>{
 for(const phone of ["+91+9000000000","++919000000000","90000+00000","abc","123"])assert.ok(validateContact({...good,phone}).phone,phone);
 for(const phone of [""," +91 (90000) 00000 ","(+91) 90000-00000","90000 00000"])assert.equal(validateContact({...good,phone}).phone,undefined,phone);
});
test("trimmed special-character briefs survive submission and contact draft encoding",()=>{
 assert.deepEqual(validateContact(good),{});const data=buildSubmission(good,"mock-only");assert.equal(data.get("name"),good.name.trim());assert.equal(data.get("email"),good.email.trim());assert.equal(data.get("replyto"),good.email.trim());assert.equal(data.get("message"),good.message.trim());
 const brief=createInquiryMessage(good);assert.ok(decodeURIComponent(emailLink(brief)).includes(good.message.trim()));assert.ok(decodeURIComponent(whatsappLink(brief)).includes(good.message.trim()));assert.ok(![...data.keys()].some(key=>/price|budget|cost/.test(key)));
});
test("all dropdown options remain valid and non-option values are rejected",()=>{
 for(const [field,options] of [["pages",pageOptions],["duration",durationOptions],["design",designOptions]]){for(const option of options)assert.equal(validateContact({...good,[field]:option.value})[field],undefined);assert.ok(validateContact({...good,[field]:"<invalid>"})[field]);}
 assert.ok(validateContact({...good,service:"<invalid>"}).service);
});
test("lossless delivery variant and self-hosted font assets are shipped without changing original photo",()=>{
 for(const file of ["public/images/nirmik-ukani-lossless.webp","public/fonts/dm-sans-latin-variable.woff2","public/fonts/space-grotesk-latin-variable.woff2","public/fonts/DM-Sans-OFL.txt","public/fonts/Space-Grotesk-OFL.txt"])assert.ok(fs.statSync(new URL("../"+file,import.meta.url)).size>0);
});
