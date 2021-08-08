# Distributed Health Care (DHC)

A Distributed Health Care system to be used by end users for verifying the veracity of vaccins and generally any type of pharmaceuticals.

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
