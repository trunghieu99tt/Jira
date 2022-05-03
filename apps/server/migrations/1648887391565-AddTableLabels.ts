import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableLabels1648887391565 implements MigrationInterface {
  name = 'AddTableLabels1648887391565';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`label\`
        (
            \`id\`    int          NOT NULL AUTO_INCREMENT,
            \`name\`  varchar(255) NOT NULL,
            \`color\` varchar(255) NOT NULL,
            PRIMARY KEY (\`id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        CREATE TABLE \`task_label\`
        (
            \`id\`       int    NOT NULL AUTO_INCREMENT,
            \`task_id\`  bigint NOT NULL,
            \`label_id\` bigint NOT NULL,
            PRIMARY KEY (\`id\`)
        ) ENGINE = InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE \`task_label\`
    `);
    await queryRunner.query(`
        DROP TABLE \`label\`
    `);
  }
}
