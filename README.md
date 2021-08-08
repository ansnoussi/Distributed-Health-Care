# Distributed Health Care (WIP)

A Distributed Health Care system to be used by end users for verifying the veracity of vaccins and generally any type of pharmaceuticals.

# Problem

All over the world, there are drugs that are banned because of known risks for health security. Some drugs that are already authorized end up being prohibited because of the detection of unwanted effects after a few months of their invention, however there are pharmacies that ignore these bans and continue to market them, or even cases where companies pharmaceuticals are testing their drugs in third world countries without prior WHO (World Health Organization) approval. Consequently, a simple consumer cannot verify whether a drug is validated by the competent authorities and may end up using prohibited drugs.

# Solution


Health care is a delicate sector that requires a great deal of caution, which is why it is essential that the data relating to this field are compliant and considered valid. The characteristics of the blockchain, including transparency and integrity, make it the ideal platform to develop a solution used by end users to check the veracity of drugs. Our solution will therefore allow users to check the veracity of drugs using blockchain technology that will provide security and transparency of information, this which guarantees trust among users.

## Gneral Architecture

![Architecture Description](./docs/overview.drawio.svg)

## FAQ

<details>
<summary> <b> Wait! this doesn't look very distibuted to me? </b> </summary>
<img align="left" width="200"  src="https://i.imgur.com/iwv6Whd.jpeg">
It's true that there are authorities represented in the architecture, but their function is similar to an index that points towards the right address in the ethereum blockchain that holds all the data (which is distributed by definition).
</details>

---

<details>
<summary> <b> Why do you need Elasticsearch if the data is stored directly on the blockchain? </b> </summary>
<img align="left" width="200"  src="https://i.imgur.com/mnn38Cg.jpeg">
One of the main functions of this system is to allow users to report illegal drugs (drugs that are not allowed by the authority in that country), and to do so we must implement a searching functionality **with fuzzing** (to avoid false positives) using solidity and it will run directly on the ethereum nodes. Nedless to say that solution is not efficient nor fast, and thus we implemented a layer-2 solution that will do exactly that using elasticsearch.
</details>

---

## Demo



https://user-images.githubusercontent.com/33237270/128640668-cef08e6a-b066-493f-873e-ab26871b5e34.mp4

