---
path: "/blog/refactoring-legacy-codebase"
date: "2020-07-23"
title: "Refactoring legacy codebase"
tags: ["Refactor", "legacy"]
---

## Priorities

- Automation
- Modularization
- Testing
- DevOps
- Data Ownership
- Distribution

## Microservice is not a cure most of the time, Modularization is

## Common tricks in Micro Refactoring
### Delegation
### State Object
### Don't fix "bugs"
### Golden Master
### Obtain confidence to change
### Baby steps
### Be creative

### draft
step1.

run golden master test
run order test

coverage add drugs
1. Move Util methods, change to static, fix logger
2. Move Datasource_id route_vi route_xx to config. extract to constant locally, than move
3. Move to package
4. Order.m_bShowDiscontinued
Order.getFrequencyText
EcwCacheManager.getInstance
m_bShowRxFormu
m_bShowBothRx

copy content of getDosages, getFormularyDosages. create methods with same siganature, then delegate

move getDosages
delete getFormularyDosages message
GetFormularyDosages
package: drugs
same module

getDosages -> getFormularyDosages
-> Field 'm_bOrderSetAdmin' needs getter : Generate Accessor

Field 'm_bShowRxFormu' needs getter  Field 'm_bShowDiscontinued' needs getter  Field 'm_bShowBothRx' needs getter  

